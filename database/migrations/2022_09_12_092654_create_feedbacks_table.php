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
        Schema::create('feedbacks', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('feedback_to')->comment('To which user feedback given');
            $table->unsignedInteger('feedback_by')->comment('Which person gives the feedback');
            $table->string('title');
            $table->text('description');
            $table->boolean('is_feedback_given')->default(0);
//            $table->string('type');
            $table->timestamps();
            $table->foreign('feedback_to')->references('id')->on('users');
            $table->foreign('feedback_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('feedbacks');
    }
};
