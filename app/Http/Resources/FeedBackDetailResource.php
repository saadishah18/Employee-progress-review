<?php

namespace App\Http\Resources;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class FeedBackDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $feedback = $this;
//        $answers = $this->ratingGivenTo;
        $answers = $this->feedbackAnswers;
        $user = $feedback->feedbackToUser ? $feedback->feedbackToUser : User::find($this->feedback_to)  ;
        $question['manager_review_questions'] =[];
        $question['self_review_questions'] = [];

        foreach ($answers as $key => $answer){
            if($answer->question->question_for === 'Manager'){
                $question['manager_review_questions'][] = [
                    'question_id'=> $answer->question->id,
                    'question_for'=> $answer->question->question_for,
                    'question_type'=> $answer->question->type,
                    'question_type_alias'=> $answer->question->type == 'Qualitative' ? 2 : 1,
                    'min_rating'=>  (double)$answer->question->min_rating,
                    'max_rating'=>  (double)$answer->question->max_rating,
                    'question'=> $answer->question->question,
                    'answer'=> $answer->answer,
                    'rating'=>  (double)$answer->rating
                ];

            }
           else{
                $question['self_review_questions'][] = [
                    'question_id'=> $answer->question->id,
                    'question_for'=> $answer->question->question_for,
                    'question_type'=> $answer->question->type,
                    'question_type_alias'=> $answer->question->type == 'Qualitative' ? 2 : 1,
                    'min_rating'=> (double)$answer->question->min_rating,
                    'max_rating'=> (double)$answer->question->max_rating,
                    'question'=> $answer->question->question,
                    'answer'=> $answer->answer,
                    'rating'=> (double)$answer->rating
                ];
            }
        }
        $new_questions_array['manager_review_questions'] = [];
        $new_questions_array['self_review_questions'] = [];
        if(!empty($question['manager_review_questions'])){
            $new_questions_array['manager_review_questions'] = collect($question['manager_review_questions'])->sortBy('question_type_alias')->values();
        }
        if(!empty($question['self_review_questions'])){
            $new_questions_array['self_review_questions'] = collect($question['self_review_questions'])->sortBy('question_type_alias')->values();
        }

      return [
          'user_id' => $user->id,
          'user_name' => $user->name,
          'department' => $user->department->name,
          'designation' => $user->designation,
          'image' => $user->image != null ? $user->image : null,
          'feedback_date' => $feedback->feedback_date,
          'feedback_month' => Carbon::parse($feedback->feedback_date)->month,
          'feedback_avg_rating' => (float)number_format((float)$feedback->feeback_avg_rating,2,'.',''),
          'questions' => $new_questions_array,
      ];
    }
}
