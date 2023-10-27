<?php

namespace App\Developer\Services;


use App\Developer\ResponseService\FCMService;
use App\Models\Answer;
use App\Models\Department;
use App\Models\Feedback;
use App\Models\Question;
use App\Models\User;
use App\Notifications\FcmNotification;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class FeedbackService
{
    public function saveFeedback($request)
    {
        $validation = Validator::make($request->all(), [
            'feedback_given_to' => 'required|integer',
            'feedback_given_by' => 'required|integer',
        ]);
        if ($validation->fails()) {
            $return_array['message'] = $validation->errors()->first();;
            $return_array['error'] = true;
            $return_array['status'] = 422;
            return $return_array;
        }
        $user = auth()->user();
        $feedback_given_to = $request->feedback_given_to;
        $feedback_given_by = $request->feedback_given_by;
        $year = Carbon::parse()->year;
        $day = Carbon::parse()->day;
        if($day == 31){
            $day = 30;
        }
        $m = Carbon::now()->startOfMonth()->subMonth()->month;
        if ($m < 10) {
            $m = '0' . $m;
        }

        if($m == '12'){
            $year = $year - 1;
        }

        $feedback_date = $year . '-' . $m . '-' . $day;
        $current_month = Carbon::parse($feedback_date);
        $feedback_custom_title = 'Feedback for the month of ' . $current_month->monthName;

        if ($feedback_given_by == $feedback_given_to) {

            $check_self_feeback_for_current_month = Feedback::where('feedback_to',$feedback_given_to)->where('feedback_by',$feedback_given_by)
                ->whereMonth('feedback_date',$m)->whereYear('feedback_date',$year)->first();
            if($check_self_feeback_for_current_month){
                $return_array['message'] = 'Self feedback already submitted for current month';
                $return_array['error'] = true;
                $return_array['status'] = 422;
                return $return_array;
            }

            $create_feedback = [
                'feedback_to' => $feedback_given_to,
                'feedback_by' => $feedback_given_by,
                'title' => $feedback_custom_title,
                'is_self_review_given' => 1,
                'is_manger_review_given' => 0,
                'is_feedback_given' => 0,
                'feedback_date' => $feedback_date,
            ];
            $save_feedback = Feedback::forceCreate($create_feedback);
            $save_answers_array = [];
            if ($save_feedback) {
                foreach ($request->question_ids as $key => $question_id) {
                    $question_detail = Question::find($question_id);
                    $save_answers_array = [
                        'question_id' => $question_id,
                        'feedback_id' => $save_feedback->id,
                        'answer' => $question_detail->type == 'Qualitative' ? $request['answers'][$key] : null,
                        'rating' => $question_detail->type == 'Quantitative' ? (double)$request['answers'][$key] : null,
//                        'rating' => null,
                        'given_to' => $feedback_given_to,
                        'given_by' => $feedback_given_by,
                        'answer_date' => $feedback_date,
                    ];
                    $save_answers = Answer::forceCreate($save_answers_array);
                }
            }
            $return_array['data'] = $save_answers_array;
            $return_array['message'] = 'Self Feedback Saved Successfully';
            $return_array['error'] = false;
            $return_array['status'] = 200;

            // send notification to manager for self review of team member
            $login_user = auth()->user();
            $manager = $login_user->manager;
            $notification_data = [
                'to' => $login_user->manager->device_token,
                'sending_user_id' => $login_user->id,
                'receiving_user_id' => $login_user->manager->id,
                'title' => 'EEP',
                'body' => ucfirst($login_user->name) . ' submitted his monthly self evaluation.',
                'data' =>  [
                    'user_id' => $login_user->id,
                    'month' => $m,
                    'year' => $year,
                ]
            ];
             $manager->notify(new FcmNotification($notification_data));

            return $return_array;
        } else {
            /*$check_manager_feedback_for_current_month = Feedback::where('feedback_to',$feedback_given_to)->where('feedback_by',$feedback_given_by)
                ->whereMonth('feedback_date',$m)->whereYear('feedback_date',$year)->first();
            if($check_manager_feedback_for_current_month){
                $return_array['message'] = 'Manager feedback already submitted for current month';
                $return_array['error'] = true;
                $return_array['status'] = 422;
                return $return_array;
            }*/
            $create_feedback = [
                'feedback_to' => $feedback_given_to,
                'feedback_by' => $feedback_given_by,
                'title' => $feedback_custom_title,
                'is_self_review_given' => 1,
                'is_manger_review_given' => 1,
                'is_feedback_given' => 1,
                'feedback_date' => $feedback_date,
            ];

            $save_feedback = Feedback::create($create_feedback);

            $save_answers_array = [];
            $total_rating = 0;
            $total_questions = 0;
            foreach ($request->question_ids as $key => $question_id) {
                $question_detail = Question::find($question_id);
                $save_answers_array = [
                    'question_id' => $question_id,
                    'feedback_id' => $save_feedback->id,
                    'answer' => $question_detail->type == 'Qualitative' ? $request['answers'][$key] : null,
                    'rating' => $question_detail->type == 'Quantitative' ? (double)$request['answers'][$key] : null,
                    'given_to' => $feedback_given_to,
                    'given_by' => $feedback_given_by,
                    'answer_date' => $feedback_date,
                ];
                $save_answers = Answer::create($save_answers_array);
//                dd($save_answers->refresh());
                if($question_detail->type == 'Quantitative'){
                    $total_rating = $total_rating + $save_answers->rating;
                    $total_questions = $total_questions + 1;
                }

            }
            $avg_rating = $total_rating / $total_questions;
            $current_feedback = Feedback::where('id',$save_feedback->id)->first();
            $current_feedback->avg_rating = $avg_rating;
            $current_feedback->update();
            $return_array['data'] = $save_answers_array;
            $return_array['message'] = 'Manager Feedback Saved Successfully';
            $return_array['error'] = false;
            $return_array['status'] = 200;

            // send notification to team member review by manager
            $login_user = auth()->user();
            $team_member = User::find($feedback_given_to);
            $notification_data = [
                'to' => $team_member->device_token,
                'sending_user_id' => $login_user->id,
//                'receiving_user_id' => $login_user->manager->id,
                'receiving_user_id' => $feedback_given_to,
                'title' => 'EEP',
                'body' => ucfirst($login_user->name) . ' submitted your monthly review.',
                'data' =>  [
                    'user_id' => $feedback_given_to,
                    'month' => $m,
                    'year' => $year,
                ]
            ];

            $team_member->notify(new FcmNotification($notification_data));

            // send notification to team member after manager rating if he stands in first 3
            $position = $this->checkTeamMemberRank($m, $year, $feedback_given_to);
            if ($position <= 3) {
                $position_notification_data = [
                    'to' => $team_member->device_token,
                    'sending_user_id' => $login_user->id,
                    'receiving_user_id' => $feedback_given_to,
                    'title' => 'EEP',
                    'body' =>ucfirst($team_member->name) . ' Congratulations! you stand at ' . $position . ' position',
                    'data' =>  [
                        'user_id' => $feedback_given_to,
                        'month' => $m,
                        'year' => $year,
                    ]
                ];
                $team_member->notify(new FcmNotification($position_notification_data));
            }
            return $return_array;
        }
    }

    public function saveAutoSelfRating()
    {
        $departments = Department::all();
        $feedback_month = now()->subMonth()->month;
        $year = now()->year;
        $date = now()->day;
        $feedback_date = $year . '-' . $feedback_month . '-' . $date;
        foreach ($departments as $department) {
            // for self review getting users whose self ratings are pending department wise

            $users = User::select('users.id', 'name', 'device_token', 'feedbacks.id as feedback_id', 'feedback_to', 'feedback_by', 'feedbacks.feedback_date')
                ->leftjoin('feedbacks', function ($query) {
                    $query->on('feedback_to', 'users.id')->on('feedback_by', 'users.id');
                    $query->whereMonth('feedback_date', date('m', strtotime('-1 month')));
                })
                ->whereNull('feedbacks.id')->with('lastManagerRating')
                ->where('department_id', $department->id)
                ->get();

            foreach ($users as $u_key => $user) {
                $feedback = Feedback::forceCreate([
                    'feedback_to' => $user->id,
                    'feedback_by' => $user->id,
                    'title' => 'self Feed back generated by cron for month ' . $feedback_month,
                    'slug' => $feedback_month . '-' . $year,
                    'description' => 'Feedback generated by cron',
                    'is_feedback_given' => 0,
                    'is_self_review_given' => 1,
                    'is_manger_review_given' => 0,
                    'feedback_date' => $feedback_date,
                ]);
                $questions = Question::where('department_id', $department->id)->where('question_for','Team Member')->get();
                foreach ($questions as $question_key => $question) {
                    $answer = $question->type === 'Qualitative' ? 'self feedback created with 0 rating' : null;
                    $rating = $question->type === 'Qualitative' ? null : 0.0;
                    Answer::forceCreate([
                        'question_id' => $question->id,
                        'feedback_id' => $feedback->id,
                        'given_to' => $user->id,
                        'given_by' => $user->id,
                        'rating' => $rating,
                        'answer' => $answer,
                        'answer_date' => $feedback_date,
                    ]);
                }

                // send notification to team member for auto self rating to 0
                $notification_data = [
                    'to' => $user->device_token,
                    'sending_user_id' => $user->id,
                    'receiving_user_id' => $user->id,
                    'title' => ucfirst($user->name),
                    'body' => 'Your self evaluation is marked as 0.',
                    'data' =>  [
                        'user_id' => $user->id,
                        'month' => $feedback_month,
                        'year' => $year,
                    ]
                ];
                $user->notify(new FcmNotification($notification_data));
            }
        }
    }

    public function checkTeamMemberRank($month, $year, $team_member_id)
    {
        $user = User::find($team_member_id);
        $employees = (new EvaluationService())->topEmployees($month, $year, $user);
        if ($employees) {
            $position = 0;
            $student_order = $employees->filter(function ($collection, $key) use ($team_member_id, &$position) {
                if ((int)$collection->feedback_to === (int)$team_member_id) {
                    $position++;
                    return true;
                }
            });
            return $position;
        }
    }

    public function selfFeedbackPendingEmployees(){

        $month = date('m', strtotime('-1 month'));
        $users = User::select('users.id','device_token', 'users.id as user_id', 'users.name', 'users.designation', 'image',
            'feedbacks.id as feedback_id', 'feedback_to',
            'feedback_by', 'is_feedback_given',
            'is_self_review_given', 'is_manger_review_given',
            'feedbacks.feedback_date')
            ->leftjoin('feedbacks', function ($query) use ($month) {
                $query->on('feedback_to', 'users.id')->on('feedback_by', 'users.id');
                $query->whereMonth('feedback_date', $month);
            })
            ->whereNull('feedbacks.id')->with('lastManagerRating')
            ->whereNotNull('department_id')
            ->get();
       foreach ($users as $user){
           // send notification to employee for self review pending alert
//           $manager = $user->manager;
           $notification_data = [
               'to' => $user->device_token,
               'sending_user_id' => $user->id,
               'receiving_user_id' => $user->id,
               'title' => 'EEP',
               'body' => ucfirst($user->name) . ' your self evaluation is pending',
               'data' =>  [
                   'user_id' => $user->id,
                   'month' => $month,
                   'year' => date('Y'),
               ]
           ];
           $user->notify(new FcmNotification($notification_data));
       }
    }
}
