<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use PhpParser\Builder\Class_;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'department_id',
        'manager_id',
        'emp_id',
        'email',
        'password',
        'designation',
        'joining_date',
        'dob','image','user_type','dob','device_token','start_date','end_date','email_verified_at'
    ];

    protected $guarded = ['id'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $dates = ['joining_date'];


    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }


    public function department(){
        return $this->belongsTo(Department::class,'department_id');
    }

    public function feedbackBy(){
        return $this->hasMany(Feedback::class,'feedback_by', 'id');
    }

    public function feedbackTo(){
        return $this->hasMany(Feedback::class,'feedback_to', 'id');
    }

    public function ratingGivenTo(){
            return $this->hasMany(Answer::class,'given_to','id');
    }

    public function ratingGivenBy(){
        return $this->hasMany(Answer::class,'given_by','id');
    }

    public function manager(){
        return $this->belongsTo(User::class,'manager_id');
    }

    public function lastManagerRating(){
        return $this->belongsTo(Feedback::class,'id','feedback_to')
            ->where('feedback_by',auth()->id())
            ->latest()->withAVG('feedbackAnswers','rating');
    }

    public function ideas(){
        return $this->hasMany(Idea::class,'submitted_by');
    }

    public function getImageAttribute($image){
       return imagePath($image);
    }


}
