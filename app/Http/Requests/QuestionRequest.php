<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class QuestionRequest extends FormRequest
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
        return [
            'department_id' => 'required',
            'question_for' => 'required',
            'type' => 'required',
            'question' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'department_id.required' => 'Department is required',
            'question_for.required' => 'Review type is required',
            'type.required' => 'Question type is required',
            'question.required' => 'Question is required',
        ];
    }
}
