<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FeedbackResourceForDirector extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $user = auth()->user();
        $user_role = $user->roles->first()->name;
        if($user_role == 'Director'){
            $team_lead_name = $user->name;
            $team_lead_image =  $user->image;
        }else{
            $team_lead_name = $this->team_lead_name ? $this->team_lead_name : $user->manager->name;
            $team_lead_image = $this->team_lead_image != null ? $this->team_lead_image : $user->manager->image;
        }
        $feedback_answers_avg_rating = $this->lastManagerRating ? (double)formatNumbers($this->lastManagerRating->feedback_answers_avg_rating) : 0.0;

        return [
            'user_id' => $this->user_id,
            'feedback_id' => $this->feedback_id,
            'user_name' => $this->name,
            'team_lead_name' => $team_lead_name,
            'designation' => $this->designation,
            'image' => $this->image == null ? null : $this->image,
            'team_lead_image' => $team_lead_image,
            'rating' => $this->rating_given_to_avg_rating ? (double)formatNumbers($this->rating_given_to_avg_rating) : $feedback_answers_avg_rating,
            'month' => (int)date('m',strtotime($this->feedback_date)),
            'custom_month' => date('F', strtotime($this->feedback_date)) . ', ' . date('Y'),
            'year' => date('Y', strtotime($this->feedback_date)),
            'feedback_date' => $this->feedback_date,
            'is_self_review_given' => $this->feedback_to ===  $this->feedback_by ? false : true,
            'is_manger_review_given' => $this->feedback_to !==  $this->feedback_by ? true : false,
            'is_feedback_given' => $this->is_feedback_given == 0 ? false : true,
            'slug' => $this->slug,
            'email' => $this->email ? $this->email : ''
        ];
    }
}
