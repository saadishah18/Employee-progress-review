<?php

namespace App\Http\Controllers\Api;

use App\Developer\ResponseService\Facades\Api;
use App\Developer\Services\DashboardService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public $dashboard_service;
    public function __construct(DashboardService $dashboard_service)
    {
        $this->dashboard_service = $dashboard_service;
    }

    public function dashboard(Request $request){
        try {
            $result = $this->dashboard_service->dashboardData($request);
            if($result['error'] == false){
                return Api::response($result['data'], $result['message'],$result['status']);
            }else{
                return Api::error($result['message'],$result['status']);
            }
        }catch (\Exception $exception){
            Api::error($exception->getMessage());
        }
    }
}
