<?php

namespace App\Http\Controllers\Api;

use App\Developer\ResponseService\Facades\Api;
use App\Developer\Services\FeedbackService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{

    protected $feedback_service;
    public function __construct(FeedbackService $feedbackService)
    {
        $this->feedback_service = $feedbackService;
    }

    public function saveFeedback(Request $request){
        try {
            $result = $this->feedback_service->saveFeedback($request);
            if($result['error'] == false){
                return Api::response(true, $result['message'],$result['status']);
            }else{
                return Api::error( $result['message'],$result['status']);
            }
        }catch (\Exception $exception){
            return Api::response($exception->getMessage().'<br>'.$exception->getLine().'<br/>'.$exception->getFile(),);
        }
    }
}
