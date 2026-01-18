"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, CheckCircle2, Sparkles } from "lucide-react";
import { modules } from "@/lib/modules";
import { useProgress } from "@/hooks/useProgress";
import { motion, AnimatePresence } from "framer-motion";

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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <aside
        className={`
          fixed top-16 left-0 bottom-0 w-72 z-40
          glass-navbar border-r border-[var(--border)]
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Overall Progress */}
          <div className="p-5 border-b border-[var(--border)]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-mid)] flex items-center justify-center">
                  <Sparkles className="text-white" size={14} />
                </div>
                <span className="text-sm font-semibold">Course Progress</span>
              </div>
              <span className="text-sm font-bold text-[var(--primary)]">
                {Math.round(totalProgress)}%
              </span>
            </div>
            <div className="progress-bar h-2">
              <motion.div
                className="progress-bar-fill"
                initial={{ width: 0 }}
                animate={{ width: `${totalProgress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            <div className="mt-2 text-xs text-[var(--muted)]">
              {progress.modulesRead.length} of {modules.length} modules completed
            </div>
          </div>

          {/* Module List */}
          <nav className="flex-1 overflow-y-auto p-4">
            {/* Progress line */}
            <div className="relative">
              <div className="absolute left-[18px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)] opacity-20" />

              <div className="space-y-1">
                {modules.map((module, index) => {
                  const isActive = pathname === `/modules/${module.slug}`;
                  const moduleProgress = getModuleProgress(module.slug);
                  const isCompleted = moduleProgress.completed;

                  return (
                    <motion.div
                      key={module.slug}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={`/modules/${module.slug}`}
                        onClick={onClose}
                        className={`
                          sidebar-link relative group
                          ${isActive ? "active" : ""}
                        `}
                      >
                        {/* Hover glow effect */}
                        {!isActive && (
                          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-[var(--gradient-start)]/5 to-transparent pointer-events-none" />
                        )}

                        <div className="flex-shrink-0 relative z-10">
                          {isCompleted ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500, damping: 25 }}
                            >
                              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center">
                                <CheckCircle2 size={18} className="text-white" />
                              </div>
                            </motion.div>
                          ) : isActive ? (
                            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                              <BookOpen size={18} />
                            </div>
                          ) : (
                            <div className="w-9 h-9 rounded-xl bg-[var(--secondary)] flex items-center justify-center group-hover:bg-[var(--border)] transition-colors">
                              <span className="text-sm font-semibold text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors">
                                {index + 1}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0 relative z-10">
                          <div className={`text-sm font-medium truncate ${
                            isActive
                              ? "text-white"
                              : isCompleted
                                ? "text-[var(--foreground)]"
                                : "text-[var(--muted)] group-hover:text-[var(--foreground)]"
                          } transition-colors`}>
                            {module.title}
                          </div>
                          <div className={`text-xs truncate ${
                            isActive
                              ? "text-white/70"
                              : "text-[var(--muted)]"
                          }`}>
                            Module {module.order}
                            {isCompleted && !isActive && (
                              <span className="ml-2 text-[var(--accent)]">✓ Complete</span>
                            )}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-[var(--border)]">
            <div className="p-3 rounded-xl bg-gradient-to-r from-[var(--gradient-start)]/10 to-[var(--gradient-mid)]/10 border border-[var(--border)]">
              <div className="text-xs text-center">
                <span className="text-[var(--muted)]">Keep learning! You&apos;re </span>
                <span className="font-semibold text-[var(--primary)]">
                  {Math.round(totalProgress)}%
                </span>
                <span className="text-[var(--muted)]"> done</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
