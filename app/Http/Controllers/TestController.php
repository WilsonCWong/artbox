<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{
    public function csrf() {
        return response(csrf_token(), 200);
    }
}
