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
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('department_id')->nullable()->comment('To determine user belongs to which department');
            $table->unsignedInteger('manager_id')->nullable()->comment('User lead/manager if any');
            $table->string('name');
            $table->string('emp_id');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('designation');
            $table->string('image')->nullable();
            $table->string('user_type')->nullable();
            $table->date('joining_date')->nullable();
            $table->string('dob')->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->foreign('manager_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
