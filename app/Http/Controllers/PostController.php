<?php

namespace App\Http\Controllers;

use App\Post;
use App\Traits\UploadTrait;
use App\User;
use App\Helpers\ConversionHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    use UploadTrait;

    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('can:update,post')
            ->only(['update', 'destroy']);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = User::findOrFail(auth()->user()->id);

        $validator = Validator::make(request()->all(), [
            'title' => ['required', 'string', 'min:1', 'max:70'],
            'post_image' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:4096'],
            'description' => ['string', 'nullable', 'max:200'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $image = $request->file('post_image');
        $description = '';
        if ($request->has('description')) {
            $description = $request->input('description');
        }

        $name = ConversionHelper::dec2hex($user->id).'_'.time();
        $folder = "/uploads/post_media/";

        $filePath = $folder . $name . '.' . $image->getClientOriginalExtension();
        $this->uploadOne($image, $folder, 'public', $name);

        $post = $user->createPost([
            'title' => $request->input('title'),
            'description' => $description
        ]);
        $post->addMedia([
            'content_url' => $filePath,
            'content_type' => 'image'
        ]);

        return response()->json(['post_id' => $post->id], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        $postAndComments = $post->load('comments');

        return response()->json(['post' => $postAndComments], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Post $post)
    {
        $validator = Validator::make(request()->all(), [
            'title' => ['required', 'string', 'min:1', 'max:70'],
            'post_image' => ['image', 'mimes:jpeg,png,jpg,gif,webp', 'max:4096'],
            'description' => ['string', 'nullable', 'max:200'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if (!request()->has('post_image')) {
            $post->update(request()->all());
            return response('', 200);
        }
        else {
            $image = request()->file('post_image');

            $name = ConversionHelper::dec2hex(auth()->user()->id).'_'.time();
            $folder = "/uploads/post_media/";

            $filePath = $folder . $name . '.' . $image->getClientOriginalExtension();
            $this->uploadOne($image, $folder, 'public', $name);

            $post->deleteMedia($post->media[0]->id);

            $post->addMedia([
                'content_url' => $filePath,
                'content_type' => 'image'
            ]);
            return response('', 200);
        }

    }


    public function destroy(Post $post)
    {
        $post->delete();

        return response('', 200);
    }
}
