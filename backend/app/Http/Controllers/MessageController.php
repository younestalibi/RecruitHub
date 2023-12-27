<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\Message;
use App\Events\MessageSent;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function send(Request $request)
    {
        $chat = Chat::find($request->chat_id);

        if (!$chat) {
            $chat = Chat::create([
                'name' => "chat_{$request->receiver_id}_" . auth()->user()->id,
            ]);
            $chat->users()->attach([auth()->user()->id, $request->receiver_id]);
        }
        $message = Message::create([
            'user_id' => auth()->user()->id,
            'receiver_id' => $request->receiver_id,
            'chat_id' => $chat->id,
            'message' => $request->message
        ]);

        broadcast(new MessageSent($message));

        return response()->json(['status' => 'Message sent successfully']);
    }

    public function markMessageAsRead(Request $request)
    {
        $otherUserId = $request->input('receiver_id');

        Message::where('user_id',$otherUserId)
        ->where('receiver_id',  auth()->user()->id)
        ->whereNull('read_at')    
        ->update(['read_at' => now()]);

        return response()->json(['status' => 'All messages marked as read']);
    }



}