"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, CheckCircle2, Circle } from "lucide-react";
import { modules } from "@/lib/modules";
import { useProgress } from "@/hooks/useProgress";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { progress, getModuleProgress } = useProgress();

  const totalProgress = progress.modulesRead.length / modules.length * 100;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-16 left-0 bottom-0 w-72 z-40
          bg-[var(--background)] border-r border-[var(--border)]
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Overall Progress */}
          <div className="p-4 border-b border-[var(--border)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Course Progress</span>
              <span className="text-sm text-[var(--muted)]">
                {Math.round(totalProgress)}%
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
          </div>

          {/* Module List */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {modules.map((module) => {
                const isActive = pathname === `/modules/${module.slug}`;
                const moduleProgress = getModuleProgress(module.slug);
                const isCompleted = moduleProgress.completed;

                return (
                  <Link
                    key={module.slug}
                    href={`/modules/${module.slug}`}
                    onClick={onClose}
                    className={`
                      sidebar-link
                      ${isActive ? "active" : ""}
                    `}
                  >
                    <div className="flex-shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 size={20} className="text-[var(--accent)]" />
                      ) : isActive ? (
                        <BookOpen size={20} />
                      ) : (
                        <Circle size={20} className="text-[var(--muted)]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-medium truncate ${!isActive && !isCompleted ? "text-[var(--muted)]" : ""}`}>
                        Module {module.order}
                      </div>
                      <div className={`text-xs truncate ${isActive ? "text-white/80" : "text-[var(--muted)]"}`}>
                        {module.title}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-[var(--border)]">
            <div className="text-xs text-[var(--muted)] text-center">
              {progress.modulesRead.length} of {modules.length} modules completed
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
