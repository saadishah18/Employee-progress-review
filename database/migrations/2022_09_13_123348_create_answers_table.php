<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('answers', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('question_id');
            $table->unsignedInteger('feedback_id')->index();
            $table->unsignedInteger('given_to')->nullable();
            $table->unsignedInteger('given_by')->nullable();
            $table->double('rating',8,2)->nullable();
            $table->string('answer')->nullable();
            $table->timestamps();
            $table->foreign('question_id')->references('id')->on('questions');
            $table->foreign('feedback_id')->references('id')->on('feedbacks');
            $table->foreign('given_to')->references('id')->on('users');
            $table->foreign('given_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('answers');
    }
};
