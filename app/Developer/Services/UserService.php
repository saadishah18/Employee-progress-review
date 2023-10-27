<?php


namespace App\Developer\Services;


use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserService
{

    public function storeUser($request)
    {
        $user =  User::forceCreate([
            'name' => $request->name,
            'email' => $request->email,
            'manager_id' => $request->manager_id,
            'department_id' => $request->department_id,
            'email_verified_at' => now(),
            'password' => Hash::make($request->password), // password
            'emp_id'=>$request->emp_id,
            'designation' => $request->designation,
            'joining_date' => date('Y-m-d',strtotime($request->joining_date)),
            'dob' => date('Y-m-d',strtotime($request->dob)),
            'user_type' => $request->user_type
        ]);
        $user->assignRole('Team Member');
        return $user;
    }

    public function userFeedbackDetail($user, $year){
        $evaluation_service = new EvaluationService();
        $yearly_rating_graph = $evaluation_service->yearlyFeedBacks($year, $user);
        return $yearly_rating_graph;
    }

}
