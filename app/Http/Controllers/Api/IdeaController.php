<?php

namespace App\Http\Controllers\Api;

use App\Developer\ResponseService\Facades\Api;
use App\Developer\Services\IdeaService;
use App\Http\Controllers\Controller;
use App\Http\Resources\IdeaResource;
use Illuminate\Http\Request;

class IdeaController extends Controller
{
    protected $idea_service;

    public function __construct(IdeaService $ideaService)
    {
        $this->idea_service = $ideaService;
    }

    public function getAllIdeas(Request $request){
        try {
            $result = $this->idea_service->getAllIdeas($request);
            if($result['error'] == false){
                return Api::response(IdeaResource::collection($result['data']), $result['message'],$result['status']);
            }else{
                return Api::error( $result['message'],$result['status']);
            }
        }catch (\Exception $exception){
            return Api::response($exception->getMessage().'<br>'.$exception->getLine().'<br/>'.$exception->getFile());
        }
    }

    public function getIdeaDetail(Request $request)
    {
        try {
            $result = $this->idea_service->getIdeaDetail($request);
            if($result['error'] == false){
                return Api::response(new IdeaResource($result['data']), $result['message'],$result['status']);
            }else{
                return Api::error( $result['message'],$result['status']);
            }
        }catch (\Exception $exception){
            return Api::response($exception->getMessage().'<br>'.$exception->getLine().'<br/>'.$exception->getFile());
        }
    }

    public function storeIdea(Request $request)
    {
        try {
            $result = $this->idea_service->storeIdea($request);
            if($result['error'] == false){
                return Api::response(new IdeaResource($result['data']), $result['message'],$result['status']);
            }else{
                return Api::error( $result['message'],$result['status']);
            }
        }catch (\Exception $exception){
            return Api::response($exception->getMessage().'<br>'.$exception->getLine().'<br/>'.$exception->getFile());
        }

    }
}
