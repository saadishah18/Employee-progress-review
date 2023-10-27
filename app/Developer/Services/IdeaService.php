<?php


namespace App\Developer\Services;


use App\Models\Idea;
use App\Notifications\FcmNotification;
use http\Env\Request;
use Illuminate\Support\Facades\Validator;

class IdeaService
{

    public function storeIdea($request){
        $validation = Validator::make($request->all(), [
            'title' => 'required',
            'description' => 'required|max:1000',
        ]);
        if ($validation->fails()) {
            $return_array['message'] = $validation->errors()->first();;
            $return_array['error'] = true;
            $return_array['status'] = 422;
            return $return_array;
        }
        $user = auth()->user();
//        $user_role = $user->roles->first()->name;
        $data_to_save = $request->all();
        $data_to_save['submitted_by'] = $user->id;

        $idea = Idea::forceCreate($data_to_save);
        if($idea){
            $return_array['data'] = $idea;
            $return_array['message'] = 'Idea Saved Successfully';
            $return_array['error'] = false;
            $return_array['status'] = 200;

            $notification_data = [
                'to' => $user->manager->device_token,
                'sending_user_id' => $user->id,
                'receiving_user_id' => $user->manager->id,
                'title' => 'EEP',
                'body' => $user->name.' submitted a new idea.',
                'data' =>  [
                    'user_id' => $user->id,
                    'idead_id' => $idea->id,
                ]
            ];
            $user->manager->notify(new FcmNotification($notification_data));
            return $return_array;
        }else{
            $return_array['message'] = 'Idea did not saved! Please Contact Administrator.';
            $return_array['error'] = true;
            $return_array['status'] = 422;
            return $return_array;
        }
    }

    public function getAllIdeas($request){
        $user = auth()->user();
        $user_role = $user->roles->first()->name;
        if($user_role != 'VP'){
          $ideas = Idea::where('submitted_by', $user->id)->get();
        }else{
            $ideas = Idea::all();
        }
        $return_array['data'] = $ideas;
        $return_array['message'] = 'Ideas listing successfully fetched';
        $return_array['error'] = false;
        $return_array['status'] = 200;
        return $return_array;
    }

    public function getIdeaDetail($request){

        $validation = Validator::make($request->all(), [
            'idea_id' => 'required|integer',
        ]);
        if ($validation->fails()) {
            $return_array['message'] = $validation->errors()->first();;
            $return_array['error'] = true;
            $return_array['status'] = 422;
            return $return_array;
        }

        $idea = Idea::find($request->idea_id);
        if($idea){
            $return_array['data'] = $idea;
            $return_array['message'] = 'Ideas detail fetched successfully';
            $return_array['error'] = false;
            $return_array['status'] = 200;
            return $return_array;
        }else{
            $return_array['data'] = null;
            $return_array['message'] = 'No record found';
            $return_array['error'] = true;
            $return_array['status'] = 404;
            return $return_array;
        }

    }

}
