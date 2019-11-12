<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthCheckController extends Controller
{
    public function __construct() {
        $this->middleware('cache.headers:private;etag');
    }

    public function __invoke(Request $request) {
        if (auth()->check()) {
            return response()->json(['user' => $request->user()], 200);
        }
        else {
            return response('', 401);
        }
    }

}
