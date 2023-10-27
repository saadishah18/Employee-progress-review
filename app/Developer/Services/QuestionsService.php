<?php


namespace App\Developer\Services;


use App\Models\Department;
use App\Models\Question;
use App\Models\User;
use Carbon\Carbon;
use http\Env\Request;
use Illuminate\Support\Facades\Validator;

class QuestionsService
{

    public function getDepartmentQuestions($request)
    {
        $validation = Validator::make($request->all(), [
            'user_id' => 'required',
        ]);
        if ($validation->fails()) {
            $return_array['message'] = $validation->errors()->first();;
            $return_array['error'] = true;
            $return_array['status'] = 422;
            return $return_array;
        }
        $receiving_user_object = User::find($request->user_id);
        $login_user = auth()->user();

      /*  if($receiving_user_object->department_id != $login_user->department_id){
            $return_array['data'] = null;;
            $return_array['message'] = 'User Department does not matched';
            $return_array['error'] = true;
            $return_array['status'] = 422;
            return $return_array;
        }*/

        if ($receiving_user_object->id == $login_user->id) {
            $department_id = $login_user->department_id;
            $questions = Question::where('department_id', $department_id)
                ->where('question_for', 'Team member')->orderby('type','desc')->get();
            $questions_array = [];
            foreach ($questions as $key => $question) {
                $questions_array['questions_list'][]= [
                    'question_id' => $question->id,
                    'question_for' => $question->question_for,
                    'question_type' => $question->type,
                    'min_rating' => (double)$question->min_rating,
                    'max_rating' => (double)$question->max_rating,
                    'question' => $question->question,
                ];
            }
            $return_array['data'] = $questions_array;;
            $return_array['message'] = 'Questions List';
            $return_array['error'] = false;
            $return_array['status'] = 200;
            return $return_array;
        } else {
//            $now = Carbon::now();
//            $monthStart = $now->startOfMonth();
//            $validation_date = $monthStart->addDays(config('constants.review_deadline_days'))->format('d');
//            $current_date = Carbon::now()->format('d');
//            if ($validation_date < $current_date) {
//                $return_array['message'] = 'Feedback can only be shared before the 10th of every month.';
//                $return_array['error'] = true;
//                $return_array['status'] = 404;
//                return $return_array;
//            }
            if($login_user->roles->first()->name == 'Director'){
                $department_id = $login_user->department_id;
                $questions = Question::where('department_id', $department_id)
                    ->where('question_for', 'Manager')->get();
            }else{
                $department_id = $receiving_user_object->department_id;
                $questions = Question::where('department_id', $department_id)
                    ->where('question_for', 'Manager')->get();
            }
            $questions_array = [];
            foreach ($questions as $key => $question) {
                $questions_array['questions_list'][] = [
                    'question_id' => $question->id,
                    'question_for' => $question->question_for,
                    'question_type' => $question->type,
                    'min_rating' => (double)$question->min_rating,
                    'max_rating' => (double)$question->max_rating,
                    'question' => $question->question,
                ];
            }
            $return_array['data'] = $questions_array;;
            $return_array['message'] = 'Questions List';
            $return_array['error'] = false;
            $return_array['status'] = 200;
            return $return_array;
        }
    }

    public function getDepartmentQuestionsForWeb($request){
//        $questions = Question::with('departments')->get();
        $questions = Department::with('questions')->get();
        return $questions;
    }


    public function storeQuestions(Request $request){

    }
}
