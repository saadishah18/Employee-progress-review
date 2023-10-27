<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;

class   UserStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */

    public function rules()
    {
//        dd(request()->method, request()->method());
        if(request()->method == 'post'){
            return [
                'name' => 'required|string|max:255',
                'email' => ['required', 'string', 'max:255',
                    Rule::unique('users', 'email')
                        ->ignore($this->user()->id)],
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
                'dob' => 'required',
                'joining_date' => 'required',
                'emp_id' => 'required',
                'designation' => 'required',
                'manager_id' => 'required',
                'role_id' => 'required',
                'department_id' => 'required',
            ];
        }else{
            return [
                'name' => 'required|string|max:255',
                'email' => 'required',
                'dob' => 'required',
                'joining_date' => 'required',
                'emp_id' => 'required',
                'designation' => 'required',
                'manager_id' => 'required',
                'role_id' => 'required',
                'department_id' => 'required',
            ];
        }

    }
}
