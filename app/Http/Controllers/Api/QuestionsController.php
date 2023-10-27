<?php

namespace App\Http\Controllers\Api;

use App\Developer\ResponseService\Facades\Api;
use App\Developer\Services\QuestionsService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class QuestionsController extends Controller
{
    protected $question_service;
    public function __construct(QuestionsService $questionsService)
    {
        $this->question_service = $questionsService;
    }

    public function departmentQuestions(Request $request){
        try {
            $result = $this->question_service->getDepartmentQuestions($request);
//            dd($result);
            if($result['error'] == false){
                return Api::response($result['data'], $result['message'],$result['status']);
            }else{
                return Api::error( $result['message'],$result['status']);
            }        }catch (\Exception $exception){
            return Api::error($exception->getMessage());
        }
    }
}
