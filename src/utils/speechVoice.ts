/**
 * Indonesian Voice Narration Engine using Web Speech API
 * Tuned with natural human cadence, pitch, and intonation.
 */

type SpeechCallback = (speaking: boolean, currentText?: string) => void;

class NaturalVoiceEngine {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private listeners: Set<SpeechCallback> = new Set();
  private isSpeakingInternal: boolean = false;
  private currentNarratedText: string = '';

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
    
    // Pick highest quality Indonesian voice
    const indonesianVoices = this.voices.filter((v) => 
      v.lang.toLowerCase().includes('id') || 
      v.lang.toLowerCase().includes('ind') ||
      v.name.toLowerCase().includes('indonesia')
    );

    // Prefer natural sounding modern voices (Google Bahasa Indonesia, Microsoft, Damayanti, etc.)
    const preferred = indonesianVoices.find((v) => 
      v.name.toLowerCase().includes('natural') || 
      v.name.toLowerCase().includes('google') ||
      v.name.toLowerCase().includes('online') ||
      v.name.toLowerCase().includes('andika') ||
      v.name.toLowerCase().includes('gadis')
    );

    this.selectedVoice = preferred || indonesianVoices[0] || this.voices.find(v => v.lang.startsWith('id')) || this.voices[0] || null;
  }

  public subscribe(cb: SpeechCallback): () => void {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify(speaking: boolean, text: string = '') {
    this.isSpeakingInternal = speaking;
    this.currentNarratedText = text;
    this.listeners.forEach((cb) => cb(speaking, text));
  }

  public getAvailableVoiceName(): string {
    return this.selectedVoice?.name || 'Suara Narator Bahasa Indonesia';
  }

  public speak(rawText: string, options?: { rate?: number; pitch?: number; onEnd?: () => void }) {
    if (!this.synth) return;

    // Cancel any previous speech
    this.stop();

    // Clean text for pleasant, natural reading
    const cleanedText = rawText
      .replace(/[#*`_~]/g, '')
      .replace(/\s+/g, ' ')
      .replace(/CPU/g, 'C.P.U.')
      .replace(/VGA/g, 'V.G.A.')
      .replace(/PSU/g, 'P.S.U.')
      .replace(/RAM/g, 'Ram')
      .replace(/DVD-ROM/g, 'DVD Rom')
      .replace(/MIN 1/g, 'MIN Satu')
      .replace(/S\.Kom/g, 'Sarjana Komputer')
      .trim();

    if (!cleanedText) return;

    // Split text into reasonable chunks if long, to avoid browser timeout truncation
    const utterance = new SpeechSynthesisUtterance(cleanedText);
    utterance.lang = 'id-ID';

    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }

    // Natural human conversational tuning:
    // Slightly slowed for instructional clarity (0.95), natural warm pitch (1.02)
    utterance.rate = options?.rate ?? 0.96;
    utterance.pitch = options?.pitch ?? 1.02;

    utterance.onstart = () => {
      this.notify(true, rawText);
    };

    utterance.onend = () => {
      this.notify(false, '');
      if (options?.onEnd) options.onEnd();
    };

    utterance.onerror = (e) => {
      // Ignore user cancellation errors
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        console.warn('Speech error:', e);
      }
      this.notify(false, '');
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public pause() {
    if (this.synth && this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
      this.notify(false, this.currentNarratedText);
    }
  }

  public resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
      this.notify(true, this.currentNarratedText);
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.notify(false, '');
      this.currentUtterance = null;
    }
  }

  public isSpeaking(): boolean {
    return this.isSpeakingInternal;
  }

  public getCurrentText(): string {
    return this.currentNarratedText;
  }
}

export const voiceEngine = new NaturalVoiceEngine();
