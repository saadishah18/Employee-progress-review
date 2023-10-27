<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
//    protected $casts = ['rating' => 'float'];

    public function question(){
        return $this->belongsTo(Question::class,'question_id');
    }

}
