<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $role = $this->roles ? $this->roles->first()->name : null;
        return [
            'user_id' => $this->id,
            'name' => $this->name,
            'emp_id' => $this->emp_id,
            'email' => $this->email,
            'designation' => $this->designation,
            'joining_date' => $this->joining_date,
            'dob' => $this->dob,
            'user_type' => $this->user_type,
            'image' => $this->image,
            'role' => $role,
            'device_token' => $this->device_token
        ];
    }
}
