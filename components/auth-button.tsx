'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { createClient } from '@/lib/supabase/client';
import { LogoutButton } from './logout-button';
import { useSignupStore } from '@/lib/stores/signup-store';


export function AuthButton() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const username = useSignupStore((s) => s.username);

  const [usernametodisplay, setUsernametodisplay] = useState("")

  useEffect(() => {
    const supabase = createClient();


    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      console.log(data)
      if (!data.user) return;

      setUser({ email: data?.user?.email! });

      console.log(data.user.id)

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", data.user.id)
        .maybeSingle();


      console.log("profile:", profile);
      console.log("error:", error);

      if (profile) {
        setUsernametodisplay(profile?.username);
      }



    };

    getUser();


    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser({ email: session.user.email! });


        } else {
          setUser(null);
          setUsernametodisplay("");
        }
      }
    );




    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {usernametodisplay}!
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant="outline">
        <Link href="/auth/login">Sign in</Link>
      </Button>
    </div>
  );
}
