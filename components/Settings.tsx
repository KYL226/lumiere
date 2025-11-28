import React, { useState } from 'react';
import { Bell, Target, Palette, Shield, Clock, RefreshCcw } from 'lucide-react';

type NotificationPrefs = {
  morning: boolean;
  afternoon: boolean;
  evening: boolean;
  weeklyDigest: boolean;
};

const Toggle: React.FC<{
  label: string;
  description?: string;
  value: boolean;
  onChange: (next: boolean) => void;
}> = ({ label, description, value, onChange }) => (
  <label className="flex items-start justify-between gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-bible-400/70 dark:hover:border-bible-500/40 transition-colors cursor-pointer">
    <div>
      <p className="font-semibold text-slate-800 dark:text-slate-100">{label}</p>
      {description && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{description}</p>}
    </div>
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-bible-500' : 'bg-slate-300 dark:bg-slate-700'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-5' : 'translate-x-1'}`} />
    </button>
  </label>
);

const SettingsCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}> = ({ icon, title, description, children }) => (
  <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
    <div className="flex items-center gap-3">
      <div className="p-3 rounded-2xl bg-bible-100 dark:bg-bible-900/40 text-bible-700 dark:text-bible-300">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-serif font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
      </div>
    </div>
    {children}
  </section>
);

const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationPrefs>({
    morning: true,
    afternoon: false,
    evening: true,
    weeklyDigest: true,
  });
  const [reminderTime, setReminderTime] = useState('07:30');
  const [goalChapters, setGoalChapters] = useState(3);
  const [memorizationGoal, setMemorizationGoal] = useState(2);
  const [themeTone, setThemeTone] = useState<'classique' | 'minimal' | 'contrast'>('classique');
  const [privacyLevel, setPrivacyLevel] = useState<'public' | 'amis' | 'privé'>('amis');

  const updateNotification = (key: keyof NotificationPrefs, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
  };

  const resetProgress = () => {
    // Placeholder action
    alert('Réinitialisation simulée pour la démo.');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-bible-500 font-semibold">Paramètres</p>
        <h1 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">Personnalise ton expérience</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl">
          Ajuste tes rappels, objectifs quotidiens et préférences d&apos;interface pour soutenir ta progression biblique.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SettingsCard
          icon={<Bell size={20} />}
          title="Rappels & Notifications"
          description="Choisis les moments où nous devons t'encourager."
        >
          <div className="space-y-4">
            <Toggle
              label="Matin (05h00 - 09h00)"
              description="Message d'encouragement au réveil."
              value={notifications.morning}
              onChange={(value) => updateNotification('morning', value)}
            />
            <Toggle
              label="Après-midi (12h00 - 15h00)"
              description="Point rapide sur ta lecture en cours."
              value={notifications.afternoon}
              onChange={(value) => updateNotification('afternoon', value)}
            />
            <Toggle
              label="Soir (20h00 - 22h00)"
              description="Rappel doux avant le coucher."
              value={notifications.evening}
              onChange={(value) => updateNotification('evening', value)}
            />
            <Toggle
              label="Digest hebdomadaire"
              description="Résumé de ta progression envoyé chaque dimanche."
              value={notifications.weeklyDigest}
              onChange={(value) => updateNotification('weeklyDigest', value)}
            />

            <div className="flex flex-col gap-2 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-4">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <Clock size={16} /> Heure favorite
              </label>
              <input
                type="time"
                value={reminderTime}
                onChange={(event) => setReminderTime(event.target.value)}
                className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-slate-800 dark:text-white focus:outline-none focus:ring focus:ring-bible-400"
              />
            </div>
          </div>
        </SettingsCard>

        <SettingsCard
          icon={<Target size={20} />}
          title="Objectifs quotidiens"
          description="Définis une cadence réaliste et motivante."
        >
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                <span>Chapitres à lire</span>
                <span>{goalChapters} chap.</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={goalChapters}
                onChange={(event) => setGoalChapters(Number(event.target.value))}
                className="w-full accent-bible-500"
              />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                <span>Versets à mémoriser</span>
                <span>{memorizationGoal} versets</span>
              </div>
              <input
                type="range"
                min={1}
                max={8}
                value={memorizationGoal}
                onChange={(event) => setMemorizationGoal(Number(event.target.value))}
                className="w-full accent-bible-500"
              />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Astuce : ajuste tes objectifs chaque semaine selon ton rythme et ta saison de vie.
            </p>
          </div>
        </SettingsCard>

        <SettingsCard
          icon={<Palette size={20} />}
          title="Personnalisation"
          description="Choisis l'ambiance visuelle qui t'inspire."
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(['classique', 'minimal', 'contrast'] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => setThemeTone(option)}
                  className={`rounded-2xl border-2 p-4 text-left capitalize ${
                    themeTone === option
                      ? 'border-bible-500 bg-bible-50 dark:bg-bible-900/20 text-bible-700 dark:text-bible-200'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              L&apos;option contraste met en valeur les éléments principaux pour les sessions nocturnes.
            </p>
          </div>
        </SettingsCard>

        <SettingsCard
          icon={<Shield size={20} />}
          title="Confidentialité & progression"
          description="Contrôle ce qui est visible pour ta communauté."
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Partage de progression</label>
              <select
                value={privacyLevel}
                onChange={(event) => setPrivacyLevel(event.target.value as typeof privacyLevel)}
                className="w-full bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-slate-800 dark:text-white focus:outline-none focus:ring focus:ring-bible-400"
              >
                <option value="public">Visible à tous</option>
                <option value="amis">Visible à mes compagnons</option>
                <option value="privé">Seulement moi</option>
              </select>
            </div>
            <div className="rounded-2xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/60 dark:bg-rose-900/10 p-4 space-y-3">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-300 font-semibold">
                <RefreshCcw size={16} />
                Réinitialiser ma progression
              </div>
              <p className="text-sm text-rose-500 dark:text-rose-200">
                Efface tes lectures, séries et scores pour repartir à zéro. Cette action est irréversible.
              </p>
              <button
                onClick={resetProgress}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white font-semibold hover:bg-rose-700 transition-colors"
              >
                Réinitialiser (démo)
              </button>
            </div>
          </div>
        </SettingsCard>
      </div>
    </div>
  );
};

export default Settings;

