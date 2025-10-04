<script lang="ts">
	import ChatMessage from '$lib/components/ChatMessage.svelte'
	import type { ChatCompletionRequestMessage } from 'openai'
	import { SSE } from 'sse.js'

	let query: string = ''
	let answer: string = ''
	let loading: boolean = false
	let chatMessages: ChatCompletionRequestMessage[] = []
	let scrollToDiv: HTMLDivElement
	let audioEnabled: boolean = false
	let audioElement: HTMLAudioElement

	let audioContext: AudioContext | null = null
	let isPlaying = false

	// Create spooky ambient sound using Web Audio API
	function createSpookyAmbience() {
		if (!audioContext) {
			audioContext = new (window.AudioContext || window.webkitAudioContext)()
		}

		// Create multiple oscillators for a richer, more atmospheric sound
		const oscillators: OscillatorNode[] = []
		const gainNodes: GainNode[] = []

		// Low rumble (sub-bass)
		const rumbleOsc = audioContext.createOscillator()
		const rumbleGain = audioContext.createGain()
		rumbleOsc.connect(rumbleGain)
		rumbleGain.connect(audioContext.destination)
		
		rumbleOsc.frequency.setValueAtTime(40, audioContext.currentTime)
		rumbleOsc.type = 'sawtooth'
		rumbleGain.gain.setValueAtTime(0.05, audioContext.currentTime)
		
		// Mid-range spooky tone
		const midOsc = audioContext.createOscillator()
		const midGain = audioContext.createGain()
		midOsc.connect(midGain)
		midGain.connect(audioContext.destination)
		
		midOsc.frequency.setValueAtTime(120, audioContext.currentTime)
		midOsc.type = 'triangle'
		midGain.gain.setValueAtTime(0.03, audioContext.currentTime)
		
		// High ethereal tone
		const highOsc = audioContext.createOscillator()
		const highGain = audioContext.createGain()
		highOsc.connect(highGain)
		highGain.connect(audioContext.destination)
		
		highOsc.frequency.setValueAtTime(800, audioContext.currentTime)
		highOsc.type = 'sine'
		highGain.gain.setValueAtTime(0.02, audioContext.currentTime)

		// Add some modulation for movement
		const lfo = audioContext.createOscillator()
		const lfoGain = audioContext.createGain()
		lfo.connect(lfoGain)
		lfoGain.connect(midOsc.frequency)
		
		lfo.frequency.setValueAtTime(0.1, audioContext.currentTime)
		lfoGain.gain.setValueAtTime(10, audioContext.currentTime)

		// Start all oscillators
		rumbleOsc.start()
		midOsc.start()
		highOsc.start()
		lfo.start()

		// Store references for cleanup
		oscillators.push(rumbleOsc, midOsc, highOsc, lfo)
		gainNodes.push(rumbleGain, midGain, highGain, lfoGain)

		return { oscillators, gainNodes }
	}

	function toggleAudio() {
		if (audioEnabled) {
			// Stop audio
			if (audioContext) {
				audioContext.close()
				audioContext = null
			}
			audioEnabled = false
			isPlaying = false
		} else {
			// Start audio
			audioEnabled = true
			isPlaying = true
			createSpookyAmbience()
		}
	}

	function scrollToBottom() {
		setTimeout(function () {
			scrollToDiv?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
		}, 100)
	}

	const handleSubmit = async () => {
		if (!query.trim() || loading) return
		
		const userQuery = query.trim()
		query = ''
		loading = true
		
		chatMessages = [...chatMessages, { role: 'user', content: userQuery }]

		const eventSource = new SSE('/api/chat', {
			headers: {
				'Content-Type': 'application/json'
			},
			payload: JSON.stringify({ messages: chatMessages })
		})

		eventSource.addEventListener('error', handleError)

		eventSource.addEventListener('message', (e) => {
			scrollToBottom()
			try {
				if (e.data === '[DONE]') {
					chatMessages = [...chatMessages, { role: 'assistant', content: answer }]
					answer = ''
					loading = false
					return
				}

				const completionResponse = JSON.parse(e.data)
				const [{ delta }] = completionResponse.choices

				if (delta.content) {
					answer = (answer ?? '') + delta.content
				}
			} catch (err) {
				handleError(err)
			}
		})
		
		eventSource.stream()
		scrollToBottom()
	}

	function handleError<T>(err: T) {
		loading = false
		query = ''
		answer = ''
		console.error(err)
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 relative overflow-hidden font-sans">
	<!-- Haunted background effects -->
	<div class="absolute inset-0">
		<!-- Floating ghost orbs -->
		<div class="absolute top-20 left-10 w-4 h-4 bg-green-400 rounded-full opacity-60 animate-float-ghost shadow-lg shadow-green-400/50"></div>
		<div class="absolute top-40 right-20 w-3 h-3 bg-blue-400 rounded-full opacity-40 animate-float-ghost-delayed shadow-lg shadow-blue-400/50"></div>
		<div class="absolute bottom-40 left-1/4 w-5 h-5 bg-purple-400 rounded-full opacity-50 animate-float-ghost-slow shadow-lg shadow-purple-400/50"></div>
		<div class="absolute top-60 right-1/3 w-2 h-2 bg-cyan-400 rounded-full opacity-70 animate-float-ghost shadow-lg shadow-cyan-400/50"></div>
		
		<!-- Spooky fog effect -->
		<div class="absolute inset-0 bg-gradient-to-t from-transparent via-gray-800/20 to-transparent animate-fog"></div>
	</div>
	
	<!-- Main container -->
	<div class="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
		<!-- Haunted chat container -->
		<div class="w-full max-w-4xl bg-black/40 backdrop-blur-sm rounded-2xl border border-green-400/30 shadow-2xl shadow-green-400/20 relative">
			<!-- Glowing border effect -->
			<div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/10 via-purple-400/10 to-green-400/10 animate-pulse"></div>
			
			<!-- Header -->
			<div class="bg-gradient-to-r from-green-600/80 to-purple-600/80 rounded-t-2xl p-4 relative font-sans">
				<div class="flex items-center space-x-3">
					<div class="w-10 h-10 bg-green-400/20 rounded-xl flex items-center justify-center border border-green-400/50">
						<svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
						</svg>
					</div>
					<div>
						<h1 class="text-xl font-bold text-green-400 drop-shadow-lg font-sans">👻 Spooky AI</h1>
						<p class="text-green-200 text-sm font-sans">Haunted by Local Spirits</p>
					</div>
					<div class="ml-auto flex items-center space-x-4">
						<!-- Audio Control Button -->
						<button 
							on:click={toggleAudio}
							class="flex items-center space-x-2 bg-green-400/20 hover:bg-green-400/30 border border-green-400/50 rounded-lg px-3 py-1 transition-all duration-200 {audioEnabled ? 'animate-pulse shadow-lg shadow-green-400/30' : ''}"
							title={audioEnabled ? 'Turn off spooky ambient sound' : 'Turn on spooky ambient sound'}
						>
							<svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
								{#if audioEnabled}
									<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
								{:else}
									<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
								{/if}
							</svg>
							<span class="text-green-400 text-xs font-sans">{audioEnabled ? '🔇' : '🔊'}</span>
						</button>
						
						<!-- Status Indicator -->
						<div class="flex items-center space-x-2">
							<div class="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
							<span class="text-green-400 text-sm font-medium font-sans">Haunting</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Chat messages area -->
			<div class="h-[500px] p-4 overflow-y-auto bg-black/30 relative font-sans">
				<!-- Spooky scrollbar -->
				<div class="space-y-4">
					<ChatMessage type="assistant" message="👻 Boo! Welcome to the haunted realm! What mysteries shall we explore together?" />
					{#each chatMessages as message}
						<ChatMessage type={message.role} message={message.content || ''} />
					{/each}
					{#if answer}
						<ChatMessage type="assistant" message={answer} />
					{/if}
					{#if loading && !answer}
						<ChatMessage type="assistant" message="🔮 The spirits are whispering..." />
					{/if}
				</div>
				<div bind:this={scrollToDiv}></div>
			</div>

			<!-- Spooky input area -->
			<div class="p-4 border-t border-green-400/20 bg-black/20 rounded-b-2xl relative font-sans">
				<form on:submit|preventDefault={handleSubmit} class="flex space-x-3">
					<input 
						type="text" 
						bind:value={query}
						placeholder="Speak to the spirits..."
						class="flex-1 bg-black/30 border border-green-400/30 rounded-xl px-4 py-3 text-green-400 placeholder-green-400/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent focus:shadow-lg focus:shadow-green-400/20 font-sans"
						disabled={loading}
					/>
					<button 
						type="submit" 
						disabled={loading || !query.trim()}
						class="bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 disabled:cursor-not-allowed border border-green-400/50 shadow-lg shadow-green-400/20 hover:shadow-green-400/40 font-sans"
					>
						{loading ? '🔮 Channeling...' : '👻 Summon'}
					</button>
				</form>
			</div>
		</div>
	</div>
</div>

<style>
	/* Global font styling */
	* {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
	}

	/* Spooky animations */
	@keyframes float-ghost {
		0%, 100% { transform: translateY(0) translateX(0); opacity: 0.6; }
		25% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
		50% { transform: translateY(-10px) translateX(-5px); opacity: 0.4; }
		75% { transform: translateY(-30px) translateX(15px); opacity: 0.7; }
	}
	
	@keyframes float-ghost-delayed {
		0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
		33% { transform: translateY(-15px) translateX(-10px); opacity: 0.6; }
		66% { transform: translateY(-25px) translateX(8px); opacity: 0.3; }
	}
	
	@keyframes float-ghost-slow {
		0%, 100% { transform: translateY(0) translateX(0); opacity: 0.5; }
		50% { transform: translateY(-12px) translateX(6px); opacity: 0.8; }
	}
	
	@keyframes fog {
		0%, 100% { opacity: 0.1; transform: translateY(0); }
		50% { opacity: 0.3; transform: translateY(-10px); }
	}

	.animate-float-ghost {
		animation: float-ghost 8s ease-in-out infinite;
	}

	.animate-float-ghost-delayed {
		animation: float-ghost-delayed 6s ease-in-out infinite 2s;
	}

	.animate-float-ghost-slow {
		animation: float-ghost-slow 10s ease-in-out infinite 4s;
	}

	.animate-fog {
		animation: fog 12s ease-in-out infinite;
	}

	/* Spooky scrollbar */
	.overflow-y-auto::-webkit-scrollbar {
		width: 8px;
	}

	.overflow-y-auto::-webkit-scrollbar-track {
		background: rgba(0, 0, 0, 0.3);
		border-radius: 10px;
	}

	.overflow-y-auto::-webkit-scrollbar-thumb {
		background: linear-gradient(to bottom, #10b981, #8b5cf6);
		border-radius: 10px;
		border: 1px solid rgba(16, 185, 129, 0.3);
	}

	.overflow-y-auto::-webkit-scrollbar-thumb:hover {
		background: linear-gradient(to bottom, #059669, #7c3aed);
		box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
	}
</style>