<?php


namespace App\Developer\Services;


use App\Developer\ResponseService\Facades\Api;
use App\Http\Resources\AnswerResource;
use App\Http\Resources\FeedbackResource;
use App\Http\Resources\FeedbackResourceForDirector;
use App\Http\Resources\PaginationResource;
use App\Models\Feedback;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class EvaluationService
{

    public function getEvaluationStandingList($request)
    {
        try {
//            $time = strtotime('-1 month');
            $order_by = '';
            $year = $request->get('year', date('Y'));
//            $month = Carbon::now()->subMonth()->month;
            $month = Carbon::now()->startOfMonth()->subMonth()->month;

//            dd($year, $month);

//            if (isset($request['sort_by']) && $request['sort_by'] == 'name') {
//                $order_by = 'name';
//                $order_by_order = 'Asc';
//            }
//            if (isset($request['sort_by']) && $request['sort_by'] == 'ratings') {
//                $order_by = 'rating_given_to_avg_rating';
//                $order_by_order = 'desc';
//            }


//            if (isset($request['sort_by']) && $request['sort_by'] == null) {
//                $order_by = 'rating_given_to_avg_rating';
//                $order_by_order = 'desc';
//            }
//            if (isset($request['sort_by']) && $request['sort_by'] == null) {
//                $order_by = 'rating_given_to_avg_rating';
//                $order_by_order = 'desc';
//            }
            $months_array = [
                '01' => 'january',
                '02' => 'february',
                '03' => 'march',
                '04' => 'april',
                '05' => 'may',
                '06' => 'june',
                '07' => 'july',
                '08' => 'august',
                '09' => 'september',
                '10' => 'october',
                '11' => 'november',
                '12' => 'december',
            ];

            if (isset($request['filter']) && $request['filter'] != '') {
                $month = array_search($request['filter'], $months_array);
            }

            $user = auth()->user();

            $query = Feedback::join('users as u1', 'feedbacks.feedback_to', 'u1.id')
                ->join('users as u2', 'feedbacks.feedback_by', 'u2.id')
                ->join('answers', 'answers.feedback_id', 'feedbacks.id')
                ->join('answers as a2', function ($join) {
                    // this is self join i am using to remove self review data in standing list
                    $join->on('answers.id', 'a2.id')->on('answers.given_to', '!=', 'a2.given_by');
                })
                /*  ->join('feedbacks as f2', function ($join) {
                      // this is self join i am using to remove self review data in standing list
                      $join->on('feedbacks.id', 'f2.id')->on('feedbacks.feedback_to', '!=', 'f2.feedback_by');
                  })*/
                ->select('u1.id as user_id', 'u1.email as member_email', 'u1.name', 'u1.designation', 'u1.image',
                    'u2.name as team_lead_name', 'u2.image as team_lead_image', 'u2.email as lead_email',
                    'feedbacks.id as feedback_id', 'feedbacks.feedback_to',
                    'feedbacks.feedback_by', 'feedbacks.is_feedback_given',
                    'feedbacks.is_self_review_given', 'feedbacks.is_manger_review_given', 'feedbacks.feedback_date',
                    'a2.given_to', 'feedbacks.slug', DB::raw('avg(a2.rating) as rating_given_to_avg_rating'))
                ->whereMonth('feedbacks.feedback_date', $month)
                ->whereYear('feedbacks.feedback_date', $year)
//                ->where('')
                ->groupBy('feedback_id');

            $user_role = $user->roles->first()->name;
            if ($user_role != 'Director') {
                $query = $query->where('u1.department_id', $user->department_id);
            } else {
                $query = $query->where('a2.given_by', $user->id);
            }

            $query = $query->orderBy('rating_given_to_avg_rating', 'desc');

//            dd($query->dd());
            $feed_backs = $query->paginate(config('constants.per_page'));


            return Api::response(
                [
                    'feedbacks' => FeedbackResource::collection($feed_backs),
                    'top_employees' => FeedbackResource::collection($this->topEmployees($month, $year, $user)),
                    'pagination' => new PaginationResource($feed_backs)
                ], 'Feedback listing');
        } catch (\Exception $exception) {
            return Api::error($exception->getMessage() . '<br>/' . $exception->getFile() . '<br>' . $exception->getLine());
        }
    }


    public function topEmployees($month = null, $current_year = null, $user = null)
    {
        if ($user) {
            $user_role = $user->roles->first()->name;
        }
        $query = Feedback::join('users as u1', 'feedbacks.feedback_to', 'u1.id')
            ->join('users as u2', 'feedbacks.feedback_by', 'u2.id')
            ->join('answers', 'answers.feedback_id', 'feedbacks.id')
            ->join('answers as a2', function ($join) {
                // this is self join i am using to remove self review data in standing list
                $join->on('answers.id', 'a2.id')->on('answers.given_to', '!=', 'a2.given_by');
            })
            /*  ->join('feedbacks as f2', function ($join) {
                  // this is self join i am using to remove self review data in standing list
                  $join->on('feedbacks.id', 'f2.id')->on('feedbacks.feedback_to', '!=', 'f2.feedback_by');
              })*/
            ->select('u1.id as user_id', 'u1.name', 'u1.designation', 'u1.image',
                'u2.name as team_lead_name', 'u2.image as team_lead_image',
                'feedbacks.id as feedback_id', 'feedbacks.feedback_to',
                'feedbacks.feedback_by', 'feedbacks.is_feedback_given',
                'feedbacks.is_self_review_given', 'feedbacks.is_manger_review_given', 'feedbacks.feedback_date',
                'a2.given_to', 'feedbacks.slug', DB::raw('avg(a2.rating) as rating_given_to_avg_rating'))
//            ->where('u1.department_id', $user->department_id)
            ->whereMonth('feedbacks.feedback_date', $month)
            ->whereYear('feedbacks.feedback_date', $current_year)
            ->groupBy('feedback_id')
            ->orderBy('rating_given_to_avg_rating', 'desc');
//            dd($user_role);
        if ($user_role != 'Director') {
            $query = $query->where('u1.department_id', $user->department_id);
        } else {
            $query = $query->where('a2.given_by', $user->id);
        }
        $top_employees = $query->take(3)->get();
        return $top_employees;
    }

    // to remove it after demo
    public function getStandingDetailold($request)
    {
        try {
            $validation = Validator::make($request->all(), [
                'slug' => 'required',
                'user_id' => 'required',
            ]);
            if ($validation->fails()) {
                $return_array['message'] = $validation->errors()->first();;
                $return_array['error'] = true;
                $return_array['status'] = 422;
                return $return_array;
            }

            $user = User::find($request->user_id);
            $login_user = auth()->user();
            $current_feedback_rating = Feedback::where('id', $request->feedback_id)
                ->whereHas('feedbackAnswers', function ($q) use ($user) {
                    $q->where('given_to', $user->id);
                })
                ->withAvg('feedbackAnswers', 'rating')
                ->first();

            if ($request->type === 'standing') {
                $feedback_details = Feedback::where('slug', $request->slug)
                    ->where('feedback_to', $user->id)
                    ->with(['feedbackToUser' => function ($q) use ($request) {
                        $q->where('id', $request->user_id);
                        $q->select('id', 'name', 'designation', 'department_id');
                    }])
                    ->with('feedbackAnswers.question')
                    ->get();
//
//                $detail_array = [];
//                foreach ($feedback_details as $detail){
//                    $detail_array[] =[
//
//                    ];
//                }

            } elseif ($request->type == 'evaluation') {
                $feedback_detail = Feedback::where('id', $request->feedback_id)
                    ->with(['feedbackToUser' => function ($q) use ($login_user) {
                        $q->where('id', $login_user->id);
                        $q->select('id', 'name', 'designation', 'department_id');
                    }])
                    ->whereHas('feedbackAnswers', function ($q) use ($request) {
                        $q->where('feedback_id', $request->feedback_id);
                    })->with('feedbackAnswers.question')
//                ->orderBy('type')
                    ->first();
            }


            $feedback_detail['feeback_avg_rating'] = $current_feedback_rating['feedback_answers_avg_rating'];


            if ($feedback_detail) {
                $return_array['data'] = $feedback_detail;
                $return_array['message'] = 'Feedback Detail';
                $return_array['error'] = false;
                $return_array['status'] = 200;
                return $return_array;
            } else {
                $return_array['message'] = 'Feedback detail not found';
                $return_array['error'] = true;
                $return_array['status'] = 404;
                return $return_array;
            }

        } catch (\Exception $exception) {
            return Api::error($exception->getMessage());
        }

    }

    public function getStandingDetail($request)
    {

        // require month and year in api call
        $validation = Validator::make($request->all(), [
            'user_id' => 'required',
            'month' => 'required',
            'year' => 'required',
        ]);
        if ($validation->fails()) {
            $return_array['message'] = $validation->errors()->first();;
            $return_array['error'] = true;
            $return_array['status'] = 422;
            return $return_array;
        }
        $time = strtotime('-1 month');
        $month = $request->get('month', date('m', $time));
        $year = $request->get('year', date('Y', $time));

        $feedbacks = Feedback::whereMonth('feedback_date', $month)->whereYear('feedback_date', $year)
            ->where('feedback_to', $request->user_id)
            ->with(['answers'])
            ->withAvg('answers', 'rating')
            ->get();

        $manager_feedback = $feedbacks->where('feedback_by', '!=', $request->user_id)->first();
        $self_feedback = $feedbacks->where('feedback_by', $request->user_id)->first();

        $user = User::find($request->user_id);
        return [
            'user_id' => $user->id,
            'user_name' => $user->name,
            'department' => $user->department->name,
            'designation' => $user->designation,
            'image' => $user->image != null ? imagePath($user->image) : null,
            'feedback_date' => object_get($manager_feedback, 'feedback_date', Carbon::parse(strtotime('-1 month'))),
//            'feedback_date' => object_get($manager_feedback, 'feedback_date', now()->subMonth(1)),
            'feedback_month' => (int)$month,
            'feedback_avg_rating' => (float)number_format(object_get($manager_feedback, 'answers_avg_rating', 0), 2, '.', ''),
            'questions' => [
                'manager_review_questions' => $manager_feedback ? AnswerResource::collection($manager_feedback->answers) : [],
                'self_review_questions' => $self_feedback ? AnswerResource::collection($self_feedback->answers) : [],
            ],
        ];
    }

    public function viewAllEvaluation($request)
    {

        // get user's data from joining date
        // add new record after due date automatically with 0 rating for self review.
        // manager can review whenever he wants in current month.

        $user = auth()->user();
        $year = $request->get('year', date('Y'));

        $logged_in_employee_self_rating = Feedback::with('feedbackAnswers')
            ->whereHas('feedbackAnswers')
            /*  ->whereHas('feedbackAnswers', function ($q) use ($user) {
                  $q->where('given_to', $user->id);
                  $q->where('given_by', $user->id);
              })*/
            ->where(['feedback_to' => $user->id, 'feedback_by' => $user->id])
            ->whereYear('feedback_date', $year)
            ->withAvg('feedbackAnswers', 'rating')
            ->orderBy('feedback_date', 'desc')
            ->get();


        $manager_ratings = Feedback::selectRaw('feedbacks.*, month(feedbacks.created_at) as created_month, month(feedbacks.feedback_date) as f_month')
            ->where(function ($q) use ($user) {
                $q->where('feedback_by', $user->manager_id)->orWhere('feedback_by', '!=', $user->id);
            })
            ->where('feedback_to', $user->id)
            ->whereYear('feedback_date', $year)
            ->with('latestAnswer')
            ->withAvg('latestAnswer', 'rating')
            ->orderBy('feedback_date', 'desc')
            ->get();


        $i = $year == date('Y') ? Carbon::now()->startOfMonth()->subMonth()->month : 12;
        $overall_manager_ratings = [];
        if ($year >= $user->joining_date->format('Y')) {
            do {
                if ($i < $user->joining_date->format('m') && $year <= $user->joining_date->format('Y')) {
                    break;
                }
                $rating = $manager_ratings->where('f_month', $i)->first();
                $feedback_by_detail = $rating ? User::find($rating->feedback_by) : $user->manager;
                $overall_manager_ratings[] = [
                    'feedback_id' => object_get($rating, 'id'),
                    'month' => (int)$i,
                    'custom_month' => date('F', strtotime('2000-' . $i . '-1')) . ', ' . date('Y'),
                    'year' => $year,
                    'feedback_date' => $rating ? Carbon::parse($rating->feedback_date) : null,
                    'feedback_created_at' => $rating->created_at ?? null,
                    'feedback_month' => $rating ? Carbon::parse($rating->feedback_date)->month : null,
                    'rating' => (double)formatNumbers($rating->latest_answer_avg_rating ?? 0.0),
                    'given_to_id' => $user->id,
                    'given_by_id' => $feedback_by_detail->id,
                    'given_to_name' => $user->name,
                    'given_by_name' => $feedback_by_detail->name,
                    'given_to_image' => $user->image != null ? imagePath($user->image) : null,
                    'given_by_image' => $feedback_by_detail->image != null ? imagePath($feedback_by_detail->image) : null,
                    'description' => $rating ? $rating->latestAnswer ? $rating->latestAnswer->answer : '' : '',
                    'manger_review' => $rating ? true : false,
                ];
                $i--;
            } while ($i >= 1);
        }

        $overall_self_ratings = [];

        foreach ($logged_in_employee_self_rating as $key => $rating) {
//            dd($rating->feedback_date, Carbon::parse($rating->feedback_date)->month);
            $given_to_detail = User::find($rating->feedback_to);
            $given_by_detail = User::find($rating->feedback_by);
            $overall_self_ratings[] = [
                'feedback_id' => $rating->id,
                'feedback_date' => $rating->feedback_date,
                'feedback_created_at' => $rating->created_at,
                'feedback_month' => Carbon::parse($rating->feedback_date)->month,
                'rating' => (double)formatNumbers($rating->feedback_answers_avg_rating),
                'given_to_id' => $rating->feedback_to,
                'given_by_id' => $rating->feedback_by,
                'given_to_name' => $given_to_detail->name,
                'given_by_name' => $given_by_detail->name,
                'given_to_image' => $given_to_detail->image != null ? imagePath($given_to_detail->image) : null,
                'given_by_image' => $given_by_detail->image != null ? imagePath($given_by_detail->image) : null,
                'self_review' => $rating->is_self_review_given == 0 ? false : true,
                'manger_review' => $rating ? true : false,
                'month' => Carbon::parse($rating->feedback_date)->month,
                'custom_month' => date('F', strtotime($rating->feedback_date)),
                'year' => $year,
            ];
        }
        $overall_ratings['self_rating'] = $overall_self_ratings;
//        dd($overall_ratings);
        $overall_ratings['manager_ratings'] = collect($overall_manager_ratings)->values();
        $return_array['data'] = $overall_ratings;
        $return_array['message'] = 'Overall ratings record';
        $return_array['error'] = false;
        $return_array['status'] = 200;
        return $return_array;
    }

    public function pendingRatingTeamMembers($request)
    {

        $user = auth()->user();
        $user_role = $user->roles->first()->name;
        if ($user_role === 'Team Member') {
            $return_array['message'] = 'Do Not authorized for this data';
            $return_array['error'] = true;
            $return_array['status'] = 422;
            return $return_array;
        }

        $deadline = config('constants.review_deadline_days');
        $today = Carbon::parse()->day;
//        if($today > $deadline){
//            $return_array['message'] = 'Rating can only be given after '.$deadline.'th of current month';
//            $return_array['error'] = true;
//            $return_array['status'] = 422;
//            return $return_array;
//        }
//        if($today == 31){
//            $month = date('m',strtotime('-1 month')) - 1;
//
//        }else{
//            $month = date('m',strtotime('-1 month'));
//        }
        $month = Carbon::now()->startOfMonth()->subMonth()->month;
        $year = $request->get('year', date('Y'));

        $query = User::select('users.id', 'users.id as user_id', 'users.name', 'users.email', 'users.designation', 'image',
            'feedbacks.id as feedback_id', 'feedback_to',
            'feedback_by', 'is_feedback_given', 'is_self_review_given', 'is_manger_review_given',
            'feedbacks.feedback_date')
            ->leftjoin('feedbacks', function ($query) use ($month, $year) {
                $query->on('feedback_to', 'users.id')->on('feedback_by', '!=', 'users.id');
                $query->whereMonth('feedback_date', $month);
                $query->whereYear('feedback_date', $year);
            })
            ->whereNull('feedbacks.id')->with('lastManagerRating')
            ->where('users.id', '!=', $user->id);
        if ($user_role == 'Director') {
            $query->where('is_team_lead', 1);
        } elseif ($user_role == 'Manager') {
//                $query->where('department_id', $user->department_id);
            $query->where('manager_id', $user->id);
        }
        $pending_feedbacks = $query->paginate(config('constants.per_page'));

        if ($user_role == 'Director') {
            $return_array['feedbacks'] = FeedbackResourceForDirector::collection($pending_feedbacks);
            $return_array['pagination'] = new PaginationResource($pending_feedbacks);
            $return_array['message'] = 'Feedback Pending Employees';
            $return_array['error'] = false;
            $return_array['status'] = 200;
        } else {
            $return_array['feedbacks'] = FeedbackResource::collection($pending_feedbacks);
            $return_array['pagination'] = new PaginationResource($pending_feedbacks);
            $return_array['message'] = 'Feedback Pending Employees';
            $return_array['error'] = false;
            $return_array['status'] = 200;
        }


        return $return_array;
    }

    public function yearlyFeedBacks($year, $user)
    {
        $i = 1;
        $feedbacks = Feedback::select('id', 'created_at', 'title', DB::raw('month(feedback_date) as f_month'), 'feedback_by')
            ->where('feedback_to', $user->id)
            ->where('feedback_by', $user->manager_id)
            ->whereYear('feedback_date', $year)
            ->withAvg('feedbackAnswers', 'rating')
            ->with('feedbackByUser')
//            ->orderby('feedback_date')
            ->get();
        $yearly_rating = [];
        do {
            $rating = $feedbacks->where('f_month', $i)->first();
            $yearly_rating[] = [
                'feedback_id' => object_get($rating, 'id'),
                'feedback_created_at' => object_get($rating, 'created_at'),
                'feedback_month' => date('F', strtotime($year . '-' . $i . '-01')),
                'rating' => $rating ? (double)formatNumbers($rating->feedback_answers_avg_rating) : 0.0,
                'manager_name' => $rating ? $rating->feedbackByUser->name : '',
            ];
            $i++;
        } while ($i <= 12);
        return $yearly_rating;
    }

    public function getAllUsersFeedbacks($user, $month, $year)
    {

        $feedbacks = Feedback::with(['feedbackByUser', 'feedbackToUser'])
            ->whereHas('feedbackToUser', function ($q) use ($user) {
                $q->where('department_id', $user->department_id);
            })
            ->join('feedbacks as f2', function ($join) {
                // this is self join i am using to remove self review data in standing list
                $join->on('feedbacks.id', 'f2.id')->on('feedbacks.feedback_to', '!=', 'f2.feedback_by');
            })
            ->withAvg('feedbackAnswers', 'rating')
            ->whereMonth('feedbacks.feedback_date', $month)
            ->whereYear('feedbacks.feedback_date', $year)
            ->get();
        return $feedbacks;
    }


    public function userYearlyAvgRating($user, $year)
    {
        $user_yearly_avg_rating = Feedback::select(DB::raw('avg(avg_rating) as feedback_answers_avg_rating'))
            ->where('feedback_to', $user->id)
            ->where('feedback_by', '!=', $user->id)
            ->whereYear('feedback_date', $year)
            ->first();
        return $user_yearly_avg_rating['feedback_answers_avg_rating'];
    }

    public function userRatingDetail($user, $month = null, $year = null)
    {
        $month = $month ? $month : date('m');
        $year = $year ? $year : date('Y');

        $current_month_manager_rating = $user->feedbackTo()->where('feedback_to', $user->id)
            ->where('feedback_by', '!=', $user->id)->whereMonth('created_at', $month)
            ->with(['feedbackToUser', 'feedbackByUser'])
            ->first();

        $now = Carbon::now();
        $monthStart = $now->startOfMonth();
        // getting date object with validation
        $validation_date = $monthStart->addDays(config('constants.review_deadline_days') - 1)->toDateString();

        $validation_date = Carbon::parse($validation_date);

        // getting difference in days w.r.t to validated day
        $today = Carbon::now();
        $validation_day = $today->startOfMonth()->addDays(config('constants.review_deadline_days') - 1)->format('d');
        $today_day = Carbon::now()->format('d');

        $current_date = Carbon::parse();

        $last_date_difference = $current_date->diffInDays($validation_date);

        $firstDayNextMonth = strtotime('first day of next month');
        $daysTilNextMonth = ($firstDayNextMonth - time()) / (24 * 3600);

        $status = 'Pending';
        if ($current_month_manager_rating == null && ($validation_day > $today_day)) {
            $message = 'Review Pending in ' . $daysTilNextMonth . ' days';
        }

        if ($current_month_manager_rating == null && ($validation_day < $today_day)) {
            $message = 'Team lead review pending in ' . $daysTilNextMonth . ' days';
        }

        if ($current_month_manager_rating) {
            $status = 'Completed';
            $message = 'Manager Reviewed For The Current Month';
        }

        $current_month_rating_array = [
            'name' =>$current_month_manager_rating ? $current_month_manager_rating->feedbackByUser->name: '',
            'email' => $current_month_manager_rating ? $current_month_manager_rating->feedbackByUser->email : '',
            'due_days' => $status == 'pending' ? $daysTilNextMonth : 'N/A',
            'rating' => $current_month_manager_rating ? $current_month_manager_rating->avg_rating : 0,
            'status' => $status,
            'image' => $current_month_manager_rating? imagePath($current_month_manager_rating->feedbackByUser->image) : '',
            'department_color' => $current_month_manager_rating ? $current_month_manager_rating->feedbackByUser->department->color : '',
        ];

        $i = 1;
        $feedbacks = Feedback::select('id','feedback_date', 'created_at', 'title', DB::raw('month(feedback_date) as f_month'), 'feedback_to', 'feedback_by')
            ->where('feedback_to', $user->id)
            ->where('feedback_by', $user->manager_id)
            ->whereYear('feedback_date', $year)
            ->with(['feedbackByUser', 'latestComment', 'feedbackToUser'])
            ->withAvg('feedbackAnswers', 'rating')
            ->get();
        $previous_months_rating_yearly = [];
        do {
            $rating = $feedbacks->where('f_month', $i)->first();
            $previous_months_rating_yearly[] = [
                'feedback_id' => object_get($rating, 'id'),
                'feedback_created_at' => object_get($rating, 'created_at'),
                'feedback_month' => date('F', strtotime($year . '-' . $i . '-01')),
                'rating' => $rating ? (double)formatNumbers($rating->feedback_answers_avg_rating) : 0.0,
                'manager_name' => $rating ? $rating->feedbackByUser->name : '',
                'manager_email' => $rating ? $rating->feedbackByUser->email : '',
                'date' => $rating ?   date('Y-M-d',strtotime($rating->feedback_date)) : '',
                'comment' => $rating ? $rating->latestComment->answer : '',
                'month' => date('F', strtotime($year . '-' . $i . '-01')),
                'year' => date('Y', strtotime($year . '-' . $i . '-01')),
                'feedback_to' => $rating ? $rating->feedback_to : '',
            ];
            $i++;
        } while ($i <= $month);
        $result_array['current_month_rating'] = $current_month_rating_array;
        $result_array['previous_months_rating_yearly'] = $previous_months_rating_yearly;
        $result_array['message'] = $message;
        $result_array['status'] = $status;

        return $result_array;
    }

    public function userMonthlyEvaluationDetail($request){
        $month = date('m',strtotime($request['month']));
        $monthly_feedback = Feedback::with('answers')
            ->where('feedback_to',$request['feedback_to'])
            ->whereMonth('feedback_date',$month)->whereYear('feedback_date',$request['year'])
            ->get();
        $result_array ['self_feedback'] = array();
        $result_array ['manager_feedback'] = array();
        foreach ($monthly_feedback as $key => $feedback){
           if($feedback->feedback_to == $feedback->feedback_by){
               foreach ($feedback->answers as $self_index => $answer){
                   $result_array ['self_feedback'][$self_index]= [
                       'question' => $answer->question->question,
                       'type' => $answer->question->type,
                       'answer' => $answer->answer,
                       'rating' => formatNumbers($answer->rating)
                   ];
               }
           }
            if($feedback->feedback_to != $feedback->feedback_by){
               foreach ($feedback->answers as $manager_index => $answer){
                   $result_array ['manager_feedback'][$manager_index]= [
                       'question' => $answer->question->question,
                       'type' => $answer->question->type,
                       'answer' => $answer->answer,
                       'rating' => formatNumbers($answer->rating)
                   ];
               }
           }
        }
        return $result_array;
    }
}
