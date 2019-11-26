<?php

namespace App;

use App\User;
use App\Mail\CommentCreated;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

/**
 * App\Post
 *
 * @property int $id
 * @property int $poster_id
 * @property string $title
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Comment[] $comments
 * @property-read int|null $comments_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\PostMedia[] $media
 * @property-read int|null $media_count
 * @property-read \App\User $poster
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Post newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Post newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Post query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Post whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Post whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Post whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Post wherePosterId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Post whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Post whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Post extends Model
{
    protected $guarded = [];

    protected $with = ['poster:id,username,profile_picture', 'media'];

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
        $newComment = $this->comments()->create($comment);
        $poster = User::select(['id', 'email'])->where('id', $this->poster->id)->first();
        if ($poster->id !== $newComment->commenter->id) {
            \Mail::to($poster->email)->queue(
                new CommentCreated($this, $newComment)
            );
        }
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
