<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //
        Schema::table('route_accesses', function (Blueprint $table) {
            $table->unsignedBigInteger('permission_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::table('route_accesses', function (Blueprint $table) {
            $table->unsignedBigInteger('permission_id')->nullable(false)->change();
        });
    }
};
