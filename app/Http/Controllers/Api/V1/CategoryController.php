<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Category::where('user_id', Auth::id());

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        $categories = $query->get();

        return response()->json([
            'data' => $categories->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'type' => $category->type,
                    'icon' => $category->icon,
                ];
            }),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'type' => 'required|in:income,expense',
            'icon' => 'nullable|string|max:100',
        ]);

        $category = Category::create([
            'user_id' => Auth::id(),
            'name' => $validated['name'],
            'type' => $validated['type'],
            'icon' => $validated['icon'],
        ]);

        return response()->json([
            'message' => 'Category created successfully',
            'data' => $category,
        ]);
    }
}
