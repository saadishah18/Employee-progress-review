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
        Schema::table('feedbacks', function (Blueprint $table) {
            $table->boolean('is_self_review_given')->default(0)->after('is_feedback_given');
            $table->boolean('is_manger_review_given')->default(0)->after('is_self_review_given');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('feedbacks', function (Blueprint $table) {
            $table->dropColumn('is_self_review_given');
            $table->dropColumn('is_manger_review_given');
        });
    }
};
