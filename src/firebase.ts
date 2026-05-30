/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCxX67Hqewn9fwDnUuFtT9C1UmSBT7FjW4",
  authDomain: "version2-407e2.firebaseapp.com",
  projectId: "version2-407e2",
  storageBucket: "version2-407e2.firebasestorage.app",
  messagingSenderId: "406441236885",
  appId: "1:406441236885:web:d2a0bdcf4106b9d2953e9c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize & Export Services
export const db = getFirestore(app);
export const auth = getAuth(app);

// Standard Operation Enum for Detailed Diagnostics
export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

/**
 * Handles Firestore security and database access errors by logging in the
 * required JSON format for diagnostics.
 */
export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map((provider) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error("Firestore Error Detailed Logistics: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
