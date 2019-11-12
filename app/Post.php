<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Post extends Model
{
    protected $guarded = [];

    protected $with = ['media'];

    public function poster() {
        return $this->belongsTo(User::class, 'poster_id');
    }

    public function comments() {
        return $this->hasMany(Comment::class);
    }

    public function media() {
        return $this->hasMany(PostMedia::class);
    }

    public function createComment($comment) {
        $this->comments()->create($comment);
    }

    public function addMedia($media) {
        $this->media()->create($media);
    }

    public function deleteMedia($id) {
        $media = $this->media()->where('id', $id)->first();
        Storage::disk('public')->delete($media->content_url);
        $media->delete();
    }
}
