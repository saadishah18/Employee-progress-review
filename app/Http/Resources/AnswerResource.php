<?php

namespace App\Http\Resources;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class AnswerResource extends JsonResource
{

    public function toArray($request)
    {

      return [
          'question_id'=> $this->question->id,
          'question_for'=> $this->question->question_for,
          'question_type'=> $this->question->type,
          'question_type_alias'=> $this->question->type == 'Qualitative' ? 2 : 1,
          'min_rating'=> (double)$this->question->min_rating,
          'max_rating'=> (double)$this->question->max_rating,
          'question'=> $this->question->question,
          'answer'=> $this->answer,
          'rating'=> (double)$this->rating
      ];
    }
}
