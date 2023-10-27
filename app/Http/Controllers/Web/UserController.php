<?php

namespace App\Http\Controllers\Web;

use App\Developer\Services\DashboardService;
use App\Developer\Services\EvaluationService;
use App\Developer\Services\UserService;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserStoreRequest;
use App\Models\Department;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    protected $user_service;

    public function __construct(UserService $userService)
    {
        $this->user_service = $userService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $service = new DashboardService();
        $team_leads = $service->teamleads();
        $departments = departments();
        $roles = Role::all();
        return Inertia::render('AddEmployee',['teamleads' => $team_leads,'roles' => $roles,'departments' =>$departments]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserStoreRequest $request)
    {
        try {
            $user = $this->user_service->storeUser($request);
            if($user){
                return Redirect::route('dashboard')->with('success', 'User created Successfully');
            }
        }catch (\Exception $exception){
            return ['error',$exception->getMessage()];
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        $year = date('Y');
        $evaluation_service = new EvaluationService();
        $user_rating_records = $evaluation_service->userRatingDetail($user);
        return Inertia::render('users/detail', [
            'user_detail' => $user,
            'yearly_feedback' => $this->user_service->userFeedbackDetail($user,$year),
            'user_manager' => $user->manager,
            'yearly_avg_rating' => formatNumbers($evaluation_service->userYearlyAvgRating($user, $year)),
            'team_leads' => (new DashboardService())->teamleads(),
            'department' => $user->department,
            'current_month_rating' => $user_rating_records['current_month_rating'],
            'previous_months_rating_yearly' => $user_rating_records['previous_months_rating_yearly']
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        $service = new DashboardService();
        return Inertia::render('users/edit', [
            'user_detail' => $user,
            'departments' => get_departments(),
            'team_leads' => $service->teamleads(),
            'roles' => Role::all(),
            'joining_date' => date('Y-m-d',strtotime($user->joining_date)),
            'user_role' => $user->roles()->first()
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UserStoreRequest $request, User $user)
    {
        try {
            $request['dob'] = date('m-d',strtotime($request['dob']));
            $request['joining_date'] = date('Y-m-d',strtotime($request['joining_date']));
//            dd($request->all());
            $user->update($request->validated());
            return Redirect::route('dashboard')->with('success','User Updated Successfully');
        }catch (\Exception $exception){
            return $exception->getMessage();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }


    public function userMonthlyEvaluationDetail(Request $request){
        try {
            $evaluation_service = new EvaluationService();
            $user_rating_records = $evaluation_service->userMonthlyEvaluationDetail($request);
            $user_detail = User::find($request->feedback_to);
            return Inertia::render('feedback/feedback_detail', [
                'self_feedback' => $user_rating_records['self_feedback'],
                'manager_feedback' => $user_rating_records['manager_feedback'],
                'user_detail'=>$user_detail,
                'user_manager'=>$user_detail->manager,
                'department' => $user_detail->department,
                'yearly_avg_rating' => formatNumbers($evaluation_service->userYearlyAvgRating($user_detail, $request['year'])),
                'team_leads' => (new DashboardService())->teamleads(),
            ]);
        }catch (\Exception $exception){
            return $exception->getMessage();
        }
    }
}
