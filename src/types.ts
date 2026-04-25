/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum Screen {
  Welcome = 'Welcome',
  DNIScan = 'DNIScan',
  DNIScanSuccess = 'DNIScanSuccess',
  BiometricSelection = 'BiometricSelection',
  FacialVerificationSetup = 'FacialVerificationSetup', // Biometric Verification (Updated Button Style)
  FacialScanning = 'FacialScanning', // Facial Verification (With Voice Option)
  BiometricSuccess = 'BiometricSuccess', // Biometric Verification Success (Corrected Step 2 Icon)
  BiometricFailure = 'BiometricFailure', // Biometric Verification Failure (With Voice Option)
  FingerprintVerificationSetup = 'FingerprintVerificationSetup', // Fingerprint Verification (With Voice Option)
  FingerprintScanning = 'FingerprintScanning', // Fingerprint Verification (Gray Cancel - With Voice)
  FingerprintSuccess = 'FingerprintSuccess',
  FingerprintFailure = 'FingerprintFailure', // Fingerprint Verification Failure (With Voice Option)
  VoiceVerificationSetup = 'VoiceVerificationSetup', // Voice Verification (With Method Options)
  VoiceScanning = 'VoiceScanning', // Voice Verification (Gray Cancel)
  VoiceSuccess = 'VoiceSuccess',
  VoiceFailure = 'VoiceFailure', // Voice Verification Failure (Centered Overlay)
  VoterConfirmation = 'VoterConfirmation' // Voter Information Confirmation (Updated Icon)
}
