<?php

namespace App\Http\Controllers\Web;

use App\Developer\Services\QuestionsService;
use App\Http\Controllers\Controller;
use App\Http\Requests\QuestionRequest;
use App\Models\Department;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class QuestionController extends Controller
{

    protected $service;

    public function __construct(QuestionsService $questionsService)
    {
        $this->service = $questionsService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
            $questions = $this->service->getDepartmentQuestionsForWeb($request);
            return Inertia::render('EvaluationQustions')->with(['questions_data'=> $questions]);

        }catch (\Exception $exception){
            return $exception->getMessage();
        }


    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        try {
            $departments = departments();
            return Inertia::render('AddNewQuestions',['departments'=> $departments]);
        }catch (\Exception $exception){
            return $exception->getMessage();
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(QuestionRequest $request)
    {
        try {
            $question = Question::create($request->all());
            if($request->get('btnValue') === 'more'){
                return Inertia::render('AddNewQuestions',['questions'=> $question])->with('success','Question Added Successfully');
            }else{
                return Redirect::route('questions.index')->with('success', 'User created Successfully');
            }
        }catch (\Exception $exception){

        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Question $question)
    {
        return Inertia::render('questions/edit', [
            'question_data' => [
                'id' => $question->id,
                'question' => $question->question,
                'question_for' => $question->question_for,
                'type' => $question->type,
                'department_id' => $question->department_id
            ],
            'departments' => get_departments()
         ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(QuestionRequest $request, Question $question)
    {
        try {
            $question->update($request->validated());
            return Redirect::route('questions.index','success');
        }catch (\Exception $exception){
            return $exception->getMessage();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Question $question)
    {
        try {
            $question->delete();
            return Redirect::back()->with('success','Question Deleted Successfully');
        }catch (\Exception $exception){
            return redirect()->back()->withErrors([
                'error' => 'Ops, Something went wrong'
            ]);
        }

    }
}
