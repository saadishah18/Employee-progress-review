<?php


namespace App\Developer\Services;


use App\Models\Department;
use App\Models\Feedback;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class DashboardService
{

    public function dashboardData($request)
    {
        $user = auth()->user();
//        $month = Carbon::now()->subMonth()->month;
        $month = Carbon::now()->startOfMonth()->subMonth()->month;

        $year = $request->get('year', date('Y'));

        $months_array = months();

        if (isset($request['filter']) && $request['filter'] != '') {
            $month = array_search($request['filter'], $months_array);
        }

        $current_rating_logged_in_employee = Feedback::where('feedback_to', $user->id)->where('feedback_by', $user->manager_id)
            ->whereHas('feedbackAnswers')
            ->whereMonth('feedback_date', $month)
            ->whereYear('feedback_date', $year)
            ->withAvg('feedbackAnswers', 'rating')
            ->orderby('id', 'desc')
            ->first();

        $logged_in_employee_yearly_rating = Feedback::select(DB::raw('avg(avg_rating) as feedback_answers_avg_rating'))->where('feedback_to', $user->id)->where('feedback_by', $user->manager_id)
            ->whereYear('feedback_date', $year)
            ->first();

        $result_array['current_rating'] = $logged_in_employee_yearly_rating == null ? (double)0.0 : (double)formatNumbers($logged_in_employee_yearly_rating->feedback_answers_avg_rating);
        $result_array['overall_ratings'] = (new EvaluationService())->yearlyFeedBacks($year, $user);

        $result_array['can_do_feedback'] = true;

        $check_can_do_self_feedback = Feedback::where('feedback_to', $user->id)
            ->where('feedback_by', $user->id)
            ->whereMonth('feedback_date', $month)->whereYear('feedback_date', $year)->exists();

        if ($check_can_do_self_feedback) {
            $result_array['can_do_feedback'] = false;
        }

        $now = Carbon::now();
        $monthStart = $now->startOfMonth();
        // getting date object with validation
        $validation_date = $monthStart->addDays(config('constants.review_deadline_days'))->toDateString();

        $validation_date = Carbon::parse($validation_date);

        // getting difference in days w.r.t to validated day
        $today = Carbon::now();
        $validation_day = $today->startOfMonth()->addDays(config('constants.review_deadline_days') - 1)->format('d');
        $today_day = Carbon::now()->format('d');

        // If role is manager and if team member review date is passed than he can review

        $check_manager_feedback = Feedback::where('feedback_to', $user->id)->where('feedback_by', $user->manager_id)
            ->whereMonth('feedback_date', $month)->whereYear('feedback_date', $year)->exists();

        $current_date = Carbon::parse();

        $last_date_difference = $current_date->diffInDays($validation_date);
//        dd($check_can_do_self_feedback, $check_manager_feedback);

        $result_array['can_do_feedback_message'] = 'Review Pending in ' . $last_date_difference . ' days';

        if ($check_can_do_self_feedback === false && $check_manager_feedback === false && ($validation_day > $today_day)) {

            $result_array['can_do_feedback_message'] = 'Review Pending in ' . $last_date_difference . ' days';
        }

        if ($check_can_do_self_feedback == true && $check_manager_feedback == false && ($validation_day < $today_day)) {
            $result_array['can_do_feedback'] = false;
            $result_array['can_do_feedback_message'] = 'Team lead Review Pending';
        }


        if ($check_can_do_self_feedback && $check_manager_feedback === false) {
            $result_array['can_do_feedback'] = false;
            $result_array['can_do_feedback_message'] = 'Manager review is pending.';
        }

        if ($check_can_do_self_feedback && $check_manager_feedback) {
            $result_array['can_do_feedback'] = false;
            $result_array['can_do_feedback_message'] = 'Reviewed For The Current Month';
        }

        if ($check_can_do_self_feedback === false && $check_manager_feedback === false && ($validation_day < $today_day)) {
            /*  $today = Carbon::now(); //Current Date and Time
              $lastDayofMonth =Carbon::parse($today)->endOfMonth()->toDateString();
              $remaining_days = $today->diffInDays($lastDayofMonth);*/

            $firstDayNextMonth = strtotime('first day of next month');
            $daysTilNextMonth = ($firstDayNextMonth - time()) / (24 * 3600);
            $result_array['can_do_feedback_message'] = 'Review option will available after ' . $daysTilNextMonth . ' days';
        }

        if ($check_can_do_self_feedback === false && $check_manager_feedback === true && ($validation_day < $today_day)) {
            $firstDayNextMonth = strtotime('first day of next month');
            $daysTilNextMonth = ($firstDayNextMonth - time()) / (24 * 3600);
            $result_array['can_do_feedback_message'] = 'Review option will available after ' . $daysTilNextMonth . ' days';
        }

        $pending_users = $this->pendingMangerFeedbackUsers();
//        $result_array['can_do_feedback'] = true;
        $result_array['pending_team_mates_count'] = $pending_users['pending_team_mates_count'];
        $result_array['pending_team_mates_list'] = $pending_users['pending_team_mates_list'];
        $result_array['role'] = auth()->user()->roles->first()->name;
        $return_array['data'] = $result_array;
        $return_array['message'] = 'Dashboard data fetched';
        $return_array['error'] = false;
        $return_array['status'] = 200;
        return $return_array;
    }

    public function pendingMangerFeedbackUsers($month = null, $year = null)
    {

        $month = Carbon::now()->startOfMonth()->subMonth()->month;
        $year = $year == null ? date('Y') : $year;
        $user = auth()->user();
        $query = User::select('users.id', 'image')->leftjoin('feedbacks', function ($query) use ($month, $year) {
//            $query->on('feedback_to','users.id')->where('feedback_by', auth()->id())
            $query->on('feedback_to', 'users.id')->on('feedback_by', '!=', 'users.id')
                ->whereMonth('feedback_date', $month)->whereYear('feedback_date', $year);
        })->whereNull('feedbacks.id')
            ->where('users.id', '!=', auth()->id());

        $user_role = $user->roles->first()->name;
        if ($user_role == 'Director') {
            $query = $query->where('is_team_lead', 1);
        } elseif ($user_role == 'Manager') {
            $query = $query->where('manager_id', $user->id);
        } else {
            $query = $query->where('department_id', $user->department_id);
        }
        $pending_team_mates_list = $query->get();
        $result_array['pending_team_mates_count'] = $pending_team_mates_list->count();
        $result_array['pending_team_mates_list'] = [];
        foreach ($pending_team_mates_list as $key => $list) {
            $result_array['pending_team_mates_list'][$key] = [
                'id' => $list->id,
                'image' => imagePath($list->image)
            ];
        }
        return $result_array;
    }

    public function webDashboardData($request)
    {
        $departments = Department::where('name', '!=', 'Director')->get();
        $department_ids = $departments->pluck('id');
        $month = $request->get('month',now()->month);
        $year = $request->get('year',date('Y'));

        $query = User::with(['feedbackTo', 'ratingGivenTo', 'department'])
            ->whereIN('department_id', $department_ids)
            ->addSelect(['yearly_rating' => Feedback::select(DB::raw('avg(avg_rating)'))
                ->whereColumn('feedback_to', '=', 'users.id')
                ->whereColumn('feedback_by', '!=', 'users.id')
                ->limit(1)
            ]);
        if($request->lead_id != 'All' && $request->lead_id != null){
            $query->where('manager_id',$request->lead_id);
        }

        if($request->review_status != 'All' && $request->review_status != 'null'){
            if($request->review_status == 'Pending'){
                $query->whereDoesntHave('feedbackTo',function ($q){
                    $q->whereColumn('feedback_by', '!=', 'users.id');
                });
            }
            if($request->review_status == 'Rated'){
                $query->whereHas('feedbackTo',function ($q){
                    $q->whereColumn('feedback_by', '!=', 'users.id');
                });
            }
        }

        if($request->search != 'All' && $request->search != null){
            $query->where('name','Like','%'.$request->search.'%');
        }

        $departments_users = $query->get();

        foreach ($departments_users as $key => $user) {

            $current_month_rating = $user->feedbackTo()->where('feedback_to', $user->id)
                ->where('feedback_by', '!=', $user->id)->whereMonth('created_at', $month)->first();
            $users_array[$user->department->name][] = [
                'name' => $user->name,
                'email' => $user->email,
                'manager' => $user->manager ? $user->manager->name : '',
                'manager_image' => $user->manager ? imagePath($user->manager->image) : '',
                'image' => imagePath($user->image),
//                    'rating' => (double)formatNumbers($user->rating_given_to_avg_rating),
                'rating' => (double)formatNumbers($user->yearly_rating),
                'edit_url' => route('users.edit',$user->id),
                'show_url' => route('users.show',$user->id),
                'delete_url' => '#',
                'status' => $current_month_rating == null ? 'Pending' : 'Completed',
                'department_color' => $user->department->color
            ];
        }
        if(count($users_array)){
            ksort($users_array);
        }
        return $users_array;
    }

    public function employeesCount()
    {

        $total_employees_count = User::count();
        $department_users_count = Department::withCount('users')->get();
        $result_array['total_users'] = $total_employees_count;
        $result_array['department_users_count'] = [];
       foreach ($department_users_count as $key => $department) {
           $result_array['department_users_count'][] = [
               'name' => $department->name,
               'y' => formatNumbers( ($department->users_count / $total_employees_count ) * 100)
           ];
           $result_array['colors'][$key] = $department->color;
        };
        return $result_array;
    }

    public function teamleads()
    {

        $teamleads = User::whereHas('roles', function ($q) {
            $q->whereNotIN('name', ['admin', 'Team Member']);
        })->get();

        $leads = [];
        foreach ($teamleads as $key => $lead) {
            $leads[] = [
                'id' => $lead->id,
                'name' => $lead->name,
                'designation' => $lead->designation,
                'image' => imagePath($lead->image),
            ];
        }

        return $leads;
    }

    public function departmentRatingChart($request)
    {
        $department_rating = Department::join('questions', 'questions.department_id', 'departments.id')
            ->join('answers', 'answers.question_id', 'questions.id')
            ->join('feedbacks', 'answers.feedback_id', 'feedbacks.id')
            ->select(['name', DB::raw('avg(rating) as avg_rating')])
            ->when(!empty($request->all()) && $request->month != 'All', function ($q) use ($request) {
                $q->whereMonth('feedbacks.feedback_date', $request->month);
            })
            ->when(!empty($request->all()) && $request->year != 'All', function ($q) use ($request) {
                $q->whereYear('feedbacks.feedback_date', $request->year);
            })
            ->groupBy('departments.id')
            ->get();
        $team_rating_data = [];
        foreach ($department_rating as $key => $rating) {
            $team_rating_data[$key] = [$rating->name, (double)formatNumbers($rating->avg_rating)];
        };
        return $team_rating_data;

    }

    public function getUsersWithPendingManagerRatingForWeb($month, $year){
        $pending_rating_users = User::select('users.*')
            ->leftjoin('feedbacks', function ($query) use($month,$year) {
                $query->on('feedback_to', 'users.id')->on('feedback_by','!=', 'users.id');
                $query->whereMonth('created_at', $month);
                $query->whereYear('created_at', $year);
            })
            ->whereNull('feedbacks.id')->with('lastManagerRating')
            ->get();
        return $pending_rating_users;
    }


}
