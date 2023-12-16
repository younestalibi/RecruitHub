<?php

namespace App\Http\Controllers;

use App\Http\Requests\jobRequest;
use App\Models\Job;
use Validator;
class JobController extends Controller
{
     
    public function index()
    {
        $jobs = Job::all();

        return response()->json($jobs);
    }

    public function store(jobRequest $request)
    {
    
         $data = $request->validated();
         $job = Job::create($data);
         return response()->json($job);

    }

    public function show(Job $job)
    {
        return response()->json($job);
    }

    public function update(jobRequest $request, Job $job)
    {
        $data = $request->validated();

        $job->updateOrFail($data);

        return response()->json($job);
    }

    public function destroy(Job $job)
    {
        $job->delete();

        return response()->json(true);
    }
}
