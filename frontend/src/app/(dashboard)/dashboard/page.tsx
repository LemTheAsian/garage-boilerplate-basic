import type { Metadata } from 'next'
import { getServerSession } from '@/actions/auth.actions'
import { adminDb } from '@/lib/firebase/admin'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function DashboardPage() {
  const session = await getServerSession()
  const profileSnap = session ? await adminDb.collection('users').doc(session.uid).get() : null

  const displayName = profileSnap?.exists
    ? (profileSnap.data()?.displayName as string | null)
    : null

  const greetingName = displayName ?? session?.email ?? null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Welcome back{greetingName ? `, ${greetingName}` : ''}.
        </p>
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 shadow-sm dark:border-blue-900 dark:bg-blue-950/30">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Getting Started
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              This is my first custom feature added to the dashboard. It gives users a quick
              introduction after signing in.
            </p>
          </div>
          <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
            New Feature
          </span>
        </div>

        <div className="mt-4 rounded-md border border-blue-100 bg-white p-4 dark:border-blue-900 dark:bg-zinc-900">
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            {greetingName
              ? `${greetingName}, your account is set up and you are ready to start exploring the app.`
              : 'Your account is set up and you are ready to start exploring the app.'}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {(['Metric One', 'Metric Two', 'Metric Three'] as const).map((title) => (
          <div
            key={title}
            className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <p className="text-sm font-medium text-zinc-500">{title}</p>
            <p className="mt-2 text-3xl font-bold">—</p>
          </div>
        ))}
      </div>
    </div>
  )
}
