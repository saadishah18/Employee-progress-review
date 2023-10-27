<?php

namespace App\Http\Resources;

use App\Models\Feedback;
use Carbon\Carbon;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use JsonSerializable;

class FeedbackResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param Request $request
     * @return array|Arrayable|JsonSerializable
     */
    public function toArray($request)
    {
        $user = auth()->user();
        $feedback_answers_avg_rating = $this->lastManagerRating ? (double)formatNumbers($this->lastManagerRating->feedback_answers_avg_rating) : 0.0;
        return [
            'user_id' => $this->user_id,
            'feedback_id' => $this->feedback_id,
            'user_name' => $this->name,
            'team_lead_name' => $this->team_lead_name ? $this->team_lead_name : $user->manager->name,
            'designation' => $this->designation,
            'image' => $this->image != null ? $this->image: null,
            'team_lead_image' => $this->team_lead_image ? $this->team_lead_image : $user->manager->image,
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
