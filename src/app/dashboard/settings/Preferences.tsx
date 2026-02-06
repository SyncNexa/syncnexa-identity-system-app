"use client";
import RadioButton from "@/components/Button/RadioButton";
import styles from "./styles/Settings.module.css";
import { useState } from "react";
import ToggleButton from "@/components/Button/ToggleButton";
import { SyncSelect } from "@/components/Input";
import { LANGUAGES } from "./languages";

function Preferences() {
  const [theme, setTheme] = useState("light");
  const [value, setValue] = useState("ng");
  const preferences = [
    {
      title: "Profile Preference",
      sub: [
        {
          title: "Theme",
          items: [
            {
              label: "Light Mode",
              type: "radio",
              action: (v: string) => {},
            },
            {
              label: "Darkt Mode",
              type: "radio",
              action: () => {},
            },
            {
              label: "System Default",
              type: "radio",
              action: () => {},
            },
          ],
        },
      ],
    },
    {
      title: "Notifications",
      sub: [
        {
          title: "System",
          items: [
            {
              label: "Verification updates",
              type: "toggle",
              action: () => {},
            },
            {
              label: "Security alerts",
              type: "toggle",
              action: () => {},
            },
            {
              label: "App activity",
              type: "toggle",
              action: () => {},
            },
            {
              label: "System announcements",
              type: "toggle",
              action: () => {},
            },
          ],
        },
        {
          title: "Alert",
          items: [
            {
              label: "Email",
              type: "toggle",
              action: () => {},
            },
            {
              label: "SMS",
              type: "toggle",
              action: () => {},
            },
            {
              label: "Push notifications",
              type: "toggle",
              action: () => {},
            },
          ],
        },
      ],
    },
    {
      title: "",
      sub: [
        {
          title: "Language",
          items: [
            {
              label: "Select language",
              type: "input",
              action: () => {},
            },
          ],
        },
      ],
    },
  ];
  return (
    <section className={styles.preferences}>
      {preferences.map((preference, pk) => (
        <div key={pk} className={styles.section}>
          <p className={styles.title}>{preference.title}</p>
          {preference.sub.map((su, sk) => (
            <div key={sk} className={styles.cat}>
              <span className={styles.cat_title}>{su.title}</span>
              {su.items.map((it, ik) => (
                <div key={ik} className={styles.row}>
                  {it.type !== "input" ? (
                    <p>{it.label}</p>
                  ) : (
                    <SyncSelect
                      // label="Country"
                      required
                      options={LANGUAGES}
                      value={value}
                      onValueChange={setValue}
                      placeholder={it.label}
                    />
                  )}
                  {it.type === "radio" ? (
                    <RadioButton
                      checked={false}
                      onChange={(v) => it.action(it.label)}
                      name="theme"
                    />
                  ) : it.type === "toggle" ? (
                    <ToggleButton />
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}

export default Preferences;
