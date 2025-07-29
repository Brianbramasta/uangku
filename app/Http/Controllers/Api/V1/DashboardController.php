<?php

namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function summary()
    {
        $currentMonth = now()->format('Y-m');

        $income = Transaction::where('user_id', Auth::id())
            ->where('type', 'income')
            ->whereMonth('date', now()->month)
            ->sum('amount');

        $expense = Transaction::where('user_id', Auth::id())
            ->where('type', 'expense')
            ->whereMonth('date', now()->month)
            ->sum('amount');

        return response()->json([
            'income' => (float)$income,
            'expense' => (float)$expense,
            'balance' => $income - $expense,
            'month' => Carbon::now()->locale('id')->isoFormat('MMMM Y')
        ]);
    }

    public function chart(Request $request)
    {
        $range = $request->input('range', 'monthly');
        $user = Auth::user();

        $data = [
            'labels' => [],
            'income_data' => [],
            'expense_data' => []
        ];

        // Implement logic for different ranges here
        // Example implementation for monthly range
        if ($range === 'monthly') {
            for ($i = 3; $i >= 0; $i--) {
                $month = now()->subMonths($i);
                $data['labels'][] = $month->locale('id')->isoFormat('MMM Y');

                $data['income_data'][] = (float)Transaction::where('user_id', $user->id)
                    ->where('type', 'income')
                    ->whereMonth('date', $month->month)
                    ->sum('amount');

                $data['expense_data'][] = (float)Transaction::where('user_id', $user->id)
                    ->where('type', 'expense')
                    ->whereMonth('date', $month->month)
                    ->sum('amount');
            }
        }

        return response()->json($data);
    }
}
