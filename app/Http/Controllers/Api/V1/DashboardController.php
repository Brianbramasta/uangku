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
            $processedMonths = [];
            $now = now();

            // Get last 4 unique months
            for ($i = 0; $i <= 3; $i++) {
                $month = $now->copy()->subMonths($i);
                $monthKey = $month->format('Y-m');

                if (!in_array($monthKey, $processedMonths)) {
                    $processedMonths[] = $monthKey;
                    $data['labels'][] = $month->locale('id')->isoFormat('MMM Y');

                    $data['income_data'][] = (float)Transaction::where('user_id', $user->id)
                        ->where('type', 'income')
                        ->whereYear('date', $month->year)
                        ->whereMonth('date', $month->month)
                        ->sum('amount');

                    $data['expense_data'][] = (float)Transaction::where('user_id', $user->id)
                        ->where('type', 'expense')
                        ->whereYear('date', $month->year)
                        ->whereMonth('date', $month->month)
                        ->sum('amount');
                }
            }

            // Reverse arrays to show oldest to newest
            $data['labels'] = array_reverse($data['labels']);
            $data['income_data'] = array_reverse($data['income_data']);
            $data['expense_data'] = array_reverse($data['expense_data']);
        }

        return response()->json($data);
    }
}
