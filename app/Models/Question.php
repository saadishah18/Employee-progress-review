<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function answers_ratings(){
        return $this->hasMany(Answer::class,'question_id');
    }

    public function department(){
        return $this->belongsTo(Department::class,'department_id');
    }
}
