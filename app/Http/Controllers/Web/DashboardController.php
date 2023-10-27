<?php

namespace App\Http\Controllers\Web;

use App\Developer\Services\DashboardService;
use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
class DashboardController extends Controller
{

    protected $dashboard_service;
    public function __construct(DashboardService $dashboardService)
    {
        $this->dashboard_service = $dashboardService;
    }

    public function dashboardData(Request $request)
    {
//        dd($request->all());
        return Inertia::render('Dashboard', [
            'employee_count' => $this->dashboard_service->employeesCount(),
            'users' => function() use ($request){
               return $this->dashboard_service->webDashboardData($request);
            },
            'teamleads' => function() use ($request){
               return $this->dashboard_service->teamleads($request);
            },
            'department_ratings' => function() use ($request){
               return $this->dashboard_service->departmentRatingChart($request);
            },
        ]);
    }
}
