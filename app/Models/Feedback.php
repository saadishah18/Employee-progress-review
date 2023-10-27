<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class  Feedback extends Model
{
    use HasFactory;

    protected $table = 'feedbacks';

//    protected $fillable = []

    protected $guarded = ['id'];

    public function feedbackByUser(){
        return $this->belongsTo(User::class,'feedback_by');
    }

    public function feedbackToUser(){
        return $this->belongsTo(User::class,'feedback_to');
    }

    public function feedbackAnswers(){
        return $this->hasMany(Answer::class,'feedback_id');
    }

    public function latestAnswer(){
//        return $this->hasOne(Answer::class,'feedback_id')->latest();
        return $this->hasOne(Answer::class,'feedback_id')->whereNotNull('rating')->latest();
    }


    public function answers()
    {
        return $this->hasMany(Answer::class)->with('question');
    }

    public function latestComment() {
        return $this->hasOne(Answer::class,'feedback_id')->whereNotNull('answer')->latest();
    }
}
