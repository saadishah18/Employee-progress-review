<?php

namespace App\Http\Controllers\Api;

use App\Developer\ResponseService\Facades\Api;
use App\Developer\Services\EvaluationService;
use App\Http\Resources\FeedBackDetailResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class EvaluationController extends Controller
{
    protected $evaluation_service;

    public function __construct(EvaluationService $evaluationService)
    {
        $this->evaluation_service = $evaluationService;
    }


    public function standings(Request $request)
    {
      return $this->evaluation_service->getEvaluationStandingList($request);
    }


    public function standingDetail(Request $request)
    {
        try {
            return Api::response($this->evaluation_service->getStandingDetail($request));
//            $result =  $this->evaluation_service->getStandingDetail($request);
//            if($result['error'] == false){
//                return Api::response(new FeedBackDetailResource($result['data']), $result['message'],$result['status']);
//            }else{
//                return Api::error( $result['message'],$result['status']);
//            }
        }catch (\Exception $exception){
            return Api::error($exception->getMessage().'-'.$exception->getFile().$exception->getLine());
        }

    }

    public function viewAllEvaluation(Request $request)
    {
        try {
            $result =  $this->evaluation_service->viewAllEvaluation($request);
            if($result['error'] == false){
                return Api::response($result['data'], $result['message'],$result['status']);
            }else{
                return Api::error( $result['message'],$result['status']);
            }
        }catch (\Exception $exception){
            return Api::error($exception->getMessage().'<br>'.$exception->getFile().'<br>'.$exception->getLine().'<br>');
        }

    }

    public function pendingRatingTeamMembers(Request $request)
    {
        try {
            $result = $this->evaluation_service->pendingRatingTeamMembers($request);
            if($result['error'] == false){
                return Api::response(['feedbacks' => $result['feedbacks'],'pagination' => $result['pagination']], $result['message'],$result['status']);
            }else{
                return Api::error( $result['message'],$result['status']);
            }
        }catch (\Exception $exception){
            return Api::error($exception->getMessage().'<br>'.$exception->getFile().'<br>'.$exception->getLine());

        }
    }
}
