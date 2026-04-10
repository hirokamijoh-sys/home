/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, 
  Utensils, 
  Bath, 
  Sparkles, 
  BookOpen, 
  Trash2, 
  MapPin, 
  Heart,
  Send,
  Loader2,
  Share2,
  Download
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { toPng } from 'html-to-image';
import { getPraise } from './lib/gemini';

// --- Components ---

/**
 * The cute character "ほめまる"
 * Replace the SVG content below with your own SVG data.
 */
const HomeruMaruSVG = ({ isPraising }: { isPraising: boolean }) => {
  return (
    <motion.div 
      className="w-full h-full"
      animate={isPraising ? {
        scale: [1, 1.05, 1],
        rotate: [0, 2, -2, 0],
      } : {
        scale: [1.3, 1.33, 1.3],
        y: [0, -8, 0],
      }}
      transition={{
        duration: isPraising ? 0.5 : 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg id="_レイヤー_1" data-name="レイヤー_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 500 410" className="w-full h-full drop-shadow-md">
        <g id="body">
          <path d="M446.63,204.71c-6.25-24.59-15.19-51.54-27.6-93.03h0C403.7,47.07,397.95,1.53,347.14,1.53c-19.43,0-37.45,16.34-52.3,29.16-12.73,10.99-28.29,7.25-44.75,8.85-16.46-1.6-32.02,2.13-44.75-8.85-14.85-12.82-32.87-29.16-52.3-29.16-50.8,0-56.54,45.53-71.88,110.15h0c-12.41,41.48-21.35,68.42-27.6,93.03-10.1,39.7-13.18,38.63-12.82,57.76,1.75,93.37,84.06,139.27,191.84,145.38h35.02c107.78-6.1,190.09-52.01,191.84-145.38.36-19.12-2.71-18.06-12.82-57.76h.01Z" fill="#ffdda1"/>
          <g>
            <ellipse cx="149.13" cy="160.66" rx="47.03" ry="37.86" fill="#ffd1a4"/>
            <ellipse cx="351.06" cy="160.66" rx="47.03" ry="37.86" fill="#ffd1a4"/>
          </g>
        </g>
        <g id="eye">
          <g>
            <path d="M212.38,111.16c1.81,6.17-10.09,5.88-25.41,10.37s-28.27,12.06-30.08,5.88,10.92-16.26,26.25-20.76c15.33-4.5,27.45-1.68,29.26,4.49h-.01Z" fill="#736357"/>
            <path d="M287.82,111.16c-1.81,6.17,10.09,5.88,25.41,10.37s28.27,12.06,30.08,5.88-10.92-16.26-26.25-20.76c-15.33-4.5-27.45-1.68-29.26,4.49h.01Z" fill="#736357"/>
          </g>
        </g>
        <g id="mouth">
          <path d="M287.57,140.77c0,6.76-16.78,29.87-37.48,29.87s-37.48-23.11-37.48-29.87,16.78-12.23,37.48-12.23,37.48,5.47,37.48,12.23h0Z" fill="#ff9388"/>
        </g>
        <motion.g 
          id="hand"
          animate={!isPraising ? { y: [0, 6, 0] } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <g>
            <path d="M80.28,143.45S3.54,188.2,1.28,218.03c-2.78,36.67,64.33,20.65,64.33,20.65l14.67-95.23h0Z" fill="#ffdda1"/>
            <path d="M419.92,143.45s76.74,44.75,79,74.58c2.78,36.67-64.33,20.65-64.33,20.65l-14.67-95.23h0Z" fill="#ffdda1"/>
          </g>
        </motion.g>
      </svg>
    </motion.div>
  );
};

/**
 * App Title SVG Placeholder
 */
const TitleSVG = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <svg id="_レイヤー_2" data-name="レイヤー_2" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 130" className="h-30 w-auto drop-shadow-[0_10px_15px_rgba(255,157,175,0.4)]">
        <defs>
          <linearGradient id="_名称未設定グラデーション_106" data-name="名称未設定グラデーション 106" x1="115.07" y1="37.73" x2="115.07" y2="91.87" gradientUnits="userSpaceOnUse">
            <stop offset=".01" stopColor="#ff9daf"/>
            <stop offset="1" stopColor="#ff6979"/>
          </linearGradient>
          <linearGradient id="_名称未設定グラデーション_1061" data-name="名称未設定グラデーション 106" x1="20.32" y1="25.69" x2="20.32" y2="73.51" gradientTransform="translate(-7.63 8.01) rotate(-9.33)" xlinkHref="#_名称未設定グラデーション_106"/>
          <linearGradient id="_名称未設定グラデーション_1062" data-name="名称未設定グラデーション 106" x1="57.82" y1="24.69" x2="57.82" y2="78.82" gradientTransform="translate(-7.63 8.01) rotate(-9.33)" xlinkHref="#_名称未設定グラデーション_106"/>
          <linearGradient id="_名称未設定グラデーション_1063" data-name="名称未設定グラデーション 106" x1="254.38" y1="26.92" x2="254.38" y2="81.06" gradientTransform="translate(-5.12 56.37) rotate(-12.35)" xlinkHref="#_名称未設定グラデーション_106"/>
          <linearGradient id="_名称未設定グラデーション_1064" data-name="名称未設定グラデーション 106" x1="158.7" y1="25.6" x2="158.7" y2="73.42" gradientTransform="translate(5.26 -16.51) rotate(5.1)" xlinkHref="#_名称未設定グラデーション_106"/>
          <linearGradient id="_名称未設定グラデーション_1065" data-name="名称未設定グラデーション 106" x1="196.19" y1="24.6" x2="196.19" y2="78.73" gradientTransform="translate(5.26 -16.51) rotate(5.1)" xlinkHref="#_名称未設定グラデーション_106"/>
        </defs>
        <path d="M298.31,50.02c-2.29-10.48-8.12-18.45-16.69-23.05,0-.17-.02-.33-.03-.49-.48-8.23-7.51-14.68-16-14.68-1.03,0-2.06.1-3.03.28-6.81,1.28-11.6,5.88-12.7,11.84-.3.06-.59.13-.89.2-2.84-4.27-7.53-6.87-12.8-6.87-1.2,0-2.42.13-3.62.4l-1.2.26-.41.13c-1.23.39-2.36.89-3.4,1.48-.42-.83-.91-1.62-1.47-2.35-2.52-3.29-6.31-5.39-10.4-5.76l-.63-.06h-.28c-5.77-.2-11.89-.66-17.8-1.1-3.48-.26-7.07-.53-10.62-.75-.27-.02-.54-.02-.81-.02-4.43,0-8.48,2.09-11.28,5.39-.03-.04-.06-.09-.09-.13-2.84-3.6-7.25-6-11.79-6.4-.45-.04-.9-.06-1.36-.06-8.02,0-15,5.93-15.9,13.47-.34,2.8-.69,5.93-1.03,9.3-.09-.12-.18-.25-.27-.37-2.96-3.57-7.51-5.77-12.13-5.88-.2,0-.39,0-.58,0-6.63,0-12.06,3.46-14.35,8.86-.12,0-.72,0-.9,0-2.29-5.95-7.86-9.83-14.67-9.83h-1.23l-.43.04c-6.45.57-11.33,4.35-13.31,9.71-.68-2.54-1.86-4.76-3.43-6.55,1.24-2.6,1.7-5.59,1.19-8.72-1.27-7.75-7.58-13.37-15.01-13.37-.8,0-1.6.07-2.38.19l-.62.1-.27.06c-5.64,1.26-11.68,2.34-17.52,3.38-3.43.61-6.97,1.25-10.46,1.92-4.62.91-8.33,4.07-10.35,8.2-2.83-2.23-6.52-3.56-10.56-3.56-.88,0-1.75.07-2.6.21C5.85,16.79-.27,24.72.81,32.71c.73,5.54,1.76,12.38,2.97,19.77,1.55,9.44,3.34,19.15,4.58,25.67,1.02,5.28,4.88,9.48,9.9,11.29-.77,1.64-1.2,3.48-1.2,5.42,0,.58,0,1.73.35,3.15.54,2.37,1.76,5.63,2.11,6.54,1.41,3.77,4.17,6.5,7.58,7.69-.51,2.47-.3,5.1.76,7.55,1.97,4.59,6.55,7.56,11.68,7.56,1.81,0,3.44-.32,4.99-.99,6.63-2.78,11.1-6.97,14.16-11.31,1.32.45,2.74.7,4.23.7.94,0,1.97,0,3.07.02,1.31.01,2.7.02,4.13.02s141.2-.03,158.96-.12c.28,3.87,2.26,7.34,5.46,9.44,2.12,1.42,4.7,2.2,7.28,2.2,3.6,0,6.9-1.45,9.34-4.02,2.72,2.53,6.39,4.02,10.6,4.02,5.94,0,11.43-2.01,15.48-5.69,2.49-2.29,3.98-5.68,3.98-9.08,0-1.44-.26-2.84-.75-4.15,2.26-2.53,3.22-5.03,3.55-7.09.49-.45.94-.85,1.35-1.22.69-.62,1.3-1.17,1.91-1.74,4.16-3.96,6.27-8.23,6.27-12.71,0-2.17-.52-4.19-1.42-5.96,5.96-8.13,8.37-19.47,6.14-29.66ZM165.8,81.46c2.48,3.88,6.24,7.14,11.27,9.04-8.01,0-16.52,0-25.14,0,1.41-2.09,2.63-4.35,3.61-6.71.03,0,.06,0,.09.01.47.04.96.06,1.44.06h0c3.22,0,6.22-.89,8.74-2.42ZM64.12,90.52c-.23-.45-.49-.88-.77-1.29,4.22-1.68,7.77-4.21,10.47-7.37,1.29,3.32,3.28,6.24,5.79,8.66-7.73,0-13.26,0-15.49,0ZM197.97,90.5c4.26-1.61,7.89-4.23,10.64-7.7,1.09.23,2.18.35,3.27.35h0c2.58,0,5.02-.66,7.16-1.86,3.54,4.71,8.75,7.97,14.74,9.31-.01.06-.03.11-.04.17-.97-.21-1.98-.34-3.03-.34l-4.82.04c-1.17.01-12.16.02-27.92.02Z" fill="#fff"/>
        <path d="M148.76,69.51c0,7.45-3.63,16.49-10.46,21.54-1.06.8-2.57,1.51-4.17,1.51-1.33,0-2.75-.53-3.99-1.86-2.22-2.39-1.24-5.23.44-7.36,5.32-6.56,6.2-10.02,6.2-15.07,0-3.46-1.6-6.38-4.34-8.69-1.6,4.08-3.46,7.98-5.58,11.17-6.91,10.46-16.4,17.64-27.48,17.64-7.71,0-14.36-3.99-16.66-10.37-.89-2.48-1.33-5.05-1.33-7.62,0-8.78,5.23-17.29,14.54-22.34-.44-2.84-.71-5.67-.97-8.33-.27-3.1,1.42-5.85,5.41-6.21h.8c3.55,0,5.67,2.3,6.03,5.32.18,1.51.44,3.28.62,5.23,1.42-.27,2.75-.44,4.17-.53,4.17-.35,8.33-.18,12.23.35.44-1.68.8-3.55,1.15-5.41.53-2.84,3.01-4.08,6.03-3.99,3.46.09,6.83,3.01,6.2,6.91-.27,1.68-.71,3.9-1.33,6.29,7.53,4.08,12.5,11.08,12.5,21.81ZM120.75,54.88c-2.92-.44-6.12-.44-9.31-.09-.62.09-1.24.18-1.95.35.53,2.92.97,5.67,1.42,7.8,1.42,7.45-9.57,10.19-11.52,2.48-.35-1.33-.62-2.66-.97-4.08-2.13,2.13-3.72,4.61-4.26,7.09-.97,5.05.71,8.6,7.18,7.98,6.03-.62,13.92-7.45,19.41-21.54Z" fill="url(#_名称未設定グラデーション_106)"/>
        <g>
          <path d="M15.75,25c-2.89.47-5.73,3.37-5.32,6.44.73,5.54,1.76,12.38,2.93,19.46,1.48,9.01,3.19,18.34,4.53,25.4.59,3.05,3.94,4.83,7,4.33s6.01-3.32,5.42-6.37c-2.45-12.71-5.94-32.35-7.2-44.9-.33-3.09-4.39-4.85-7.36-4.36Z" fill="url(#_名称未設定グラデーション_1061)"/>
          <path d="M77.84,54.59c-1.97-.49-5.36-.92-8.92-1.23-.29-2.83-.73-6.08-1.19-9.42,1.66-.27,3.31-.63,4.96-.99,2.86-.65,4.86-3.22,4.27-6.27-.72-3.83-3.4-5.37-6.34-4.71l-4.59,1.02c-.38-1.74-.63-3.31-.95-4.69-.09-.52-.26-1.04-.51-1.44l5.47-1.17c2.86-.65,4.84-2.77,4.34-5.83-.6-3.67-3.44-5.63-6.24-5.17l-.35.06c-9.19,2.05-18.91,3.56-28.23,5.36-2.78.55-4.58,3.81-4.08,6.87.47,2.89,3.47,4.73,6.53,4.23,3.59-.59,7.16-1.27,10.82-1.96-.1.47-.05.82.03,1.25l.8,4.9-11.15,2.1c-2.87.56-5.01,2.89-4.5,5.95.69,4.2,3.49,5.36,6.46,4.87,3.67-.6,7.35-1.21,11.01-1.9.37,2.27.76,4.64,1.08,7.1-6.81,1.21-11.97,3.14-15.55,7.59-2.4,2.91-3.16,6.45-2.6,9.86,1.06,6.47,7.11,12.13,16.56,10.57,8.75-1.44,14.85-6.93,15.03-15.68,2,.12,4.72.3,6.09.44,3.83.36,5.67-2.1,6.07-4.59.19-1.02.22-1.92.09-2.71-.37-2.27-1.87-3.73-4.41-4.4ZM59.33,70.05c-1.01,1.32-2.16,2.64-3.85,4.86-6.02-2.89-9.08-5.58-9.49-8.06-.35-2.12.83-4.09,2.56-4.37,1.31-.22,3.02.35,4.89,2.1.25-.07.51-.13.77-.18,1.11-1.95,2.56-2.93,3.87-3.14,1.73-.28,3.24.72,3.55,2.61.26,1.58-.38,3.62-2.31,6.18Z" fill="url(#_名称未設定グラデーション_1062)"/>
        </g>
        <path d="M288.83,52.09c1.59,7.27-.02,16.88-5.61,23.28-.87,1.01-2.19,2.02-3.75,2.36-1.3.28-2.8.07-4.29-.97-2.68-1.86-2.33-4.84-1.14-7.28,3.79-7.54,3.92-11.11,2.84-16.05-.74-3.38-2.92-5.89-6.1-7.56-.69,4.32-1.67,8.53-3.07,12.11-4.52,11.7-12.25,20.74-23.07,23.11-7.53,1.65-14.88-.82-18.5-6.57-1.4-2.24-2.38-4.65-2.93-7.16-1.88-8.57,1.41-18,9.42-24.93-1.04-2.68-1.91-5.39-2.73-7.93-.92-2.97.13-6.02,3.95-7.22l.78-.17c3.46-.76,6.03,1.04,7.03,3.91.49,1.43,1.13,3.11,1.72,4.98,1.33-.56,2.59-1.02,3.96-1.41,3.99-1.24,8.1-1.96,12.03-2.27.07-1.74.02-3.63-.03-5.53-.09-2.88,2.07-4.63,5.04-5.19,3.4-.65,7.31,1.48,7.54,5.43.1,1.7.14,3.96.05,6.43,8.23,2.37,14.58,8.15,16.87,18.63ZM258.34,43.8c-2.95.19-6.07.87-9.11,1.9-.59.22-1.17.44-1.83.76,1.15,2.74,2.17,5.33,3.05,7.32,2.98,6.97-7.17,12.01-10.73,4.89-.63-1.22-1.17-2.46-1.82-3.77-1.62,2.53-2.65,5.3-2.64,7.84.13,5.14,2.53,8.25,8.72,6.26,5.75-1.9,12-10.25,14.36-25.19Z" fill="url(#_名称未設定グラデーション_1063)"/>
        <g>
          <path d="M161.5,18c-2.91-.26-6.39,1.83-6.76,4.91-.67,5.55-1.38,12.43-2.02,19.58-.81,9.09-1.48,18.56-1.94,25.72-.19,3.1,2.61,5.66,5.7,5.94s6.65-1.72,6.84-4.82c.8-12.92,2.31-32.81,4.22-45.28.45-3.07-3.04-5.79-6.04-6.06Z" fill="url(#_名称未設定グラデーション_1064)"/>
          <path d="M214.25,62.13c-1.78-.96-4.96-2.22-8.33-3.41.43-2.81.81-6.07,1.2-9.42,1.68.15,3.36.21,5.05.27,2.93.08,5.51-1.91,5.7-5.01.26-3.89-1.95-6.05-4.97-6.14l-4.7-.15c.07-1.77.21-3.36.25-4.78.05-.53,0-1.07-.13-1.52l5.59.23c2.93.08,5.38-1.48,5.66-4.57.33-3.71-1.93-6.31-4.75-6.57l-.35-.03c-9.41-.31-19.2-1.27-28.67-1.85-2.83-.16-5.39,2.54-5.66,5.63-.26,2.91,2.18,5.45,5.27,5.72,3.62.32,7.25.56,10.96.8-.22.43-.25.78-.29,1.22l-.44,4.94-11.32-.74c-2.92-.17-5.57,1.55-5.84,4.64-.38,4.24,2.04,6.06,5.04,6.32,3.71.33,7.42.66,11.13.9-.21,2.3-.42,4.68-.73,7.14-6.89-.53-12.37.05-16.95,3.47-3.05,2.22-4.67,5.46-4.98,8.9-.58,6.53,3.87,13.52,13.4,14.37,8.83.79,16.11-3.01,18.46-11.43,1.9.62,4.5,1.47,5.79,1.94,3.62,1.3,6.02-.62,7.03-2.93.44-.94.7-1.81.77-2.6.2-2.29-.88-4.08-3.17-5.36ZM192.47,72.49c-1.31,1.03-2.75,2.02-4.94,3.75-5.11-4.3-7.4-7.67-7.18-10.17.19-2.14,1.82-3.75,3.57-3.6,1.33.12,2.83,1.09,4.21,3.25.26,0,.52,0,.79.02,1.56-1.61,3.21-2.2,4.53-2.08,1.75.16,2.96,1.5,2.79,3.41-.14,1.59-1.27,3.41-3.78,5.41Z" fill="url(#_名称未設定グラデーション_1065)"/>
        </g>
        <g>
          <path d="M28.62,101.14c-.75-1.97-1.51-4.23-1.76-5.4-.08-.29-.08-.59-.08-.88,0-1.34.71-2.3,2.01-2.72,1.55-.5,3.23-.08,3.69,1.84.46,2.01.96,3.6,1.47,5.74.38,1.59-.54,3.02-1.84,3.35-1.76.46-2.85-.25-3.48-1.93ZM37.5,99.59c-.8-2.18-1.34-3.85-1.72-5.45-.5-2.1.63-3.6,2.85-3.6,1.34,0,2.51.63,2.76,1.84.34,1.72.75,3.39,1.34,5.32.5,1.59-.08,3.23-1.63,3.69-1.55.46-2.85.29-3.6-1.8ZM39.55,117.65c-1.09,0-2.26-.5-2.76-1.68-.63-1.47,0-3.14,1.47-3.98,8.76-4.86,9.64-10.35,11.39-16.13.46-1.55,1.38-2.77,3.48-2.51,1.47.17,2.68,1.42,2.68,2.89,0,.17,0,.33-.04.5-1.47,7.16-4.61,16.34-15.04,20.69-.38.17-.75.21-1.17.21Z" fill="#ffc050"/>
          <path d="M59.95,103.28c0-1.51,1.09-3.06,3.27-3.06,3.6,0,158.14,0,162.75-.04l4.82-.04c2.14,0,3.27,1.38,3.27,2.81s-1.17,2.93-3.52,3.02c-3.02.08-155.88.13-160.41.13-2.64,0-5.15-.04-7.21-.04s-2.97-1.38-2.97-2.76Z" fill="#ffc050"/>
          <path d="M238.74,114.76c0-.67.17-1.34.5-2.01,2.39-4.82,3.94-9.22,3.94-19.1-.04-1.76.67-3.39,2.89-3.39,1.8,0,2.97,1.05,3.06,3.23.17,10.77-1.8,18.35-4.4,22.37-.8,1.26-1.84,1.76-2.89,1.76-.67,0-1.38-.21-1.93-.59-.8-.5-1.17-1.34-1.17-2.26ZM255.96,111.41c-.04-6.32.08-13.32.08-19.65,0-2.51,1.47-3.06,3.1-3.06s3.06,1.34,3.02,3.06c-.08,5.82-.08,12.65-.08,18.47,0,1.17.42,1.59,1.17,1.59.63,0,2.01-.38,3.77-1.05.84-.33,1.59-.63,2.3-.63.5,0,1.05.25,1.55.75.46.46.67,1.05.67,1.63,0,.71-.34,1.47-.84,1.93-2.76,2.51-6.28,3.14-8.92,3.14-3.81,0-5.78-2.51-5.82-6.2Z" fill="#ffc050"/>
        </g>
        <path d="M268.12,86.04c0-2.12,1.47-3.86,3.21-3.86,1.42,0,3.14.95,4.81,3.32,1.49-2.12,3.25-2.98,4.7-2.98,1.74,0,3.05,1.22,3.05,3.12,0,1.58-.95,3.48-3.25,5.67-1.2,1.13-2.53,2.24-4.54,4.14-5.42-3.8-7.98-6.92-7.98-9.4Z" fill="#ffc050"/>
        <path d="M265.89,99.6c0-1.16.8-2.11,1.75-2.11.78,0,1.72.52,2.63,1.82.81-1.16,1.78-1.63,2.57-1.63.95,0,1.67.67,1.67,1.7,0,.86-.52,1.9-1.78,3.1-.65.62-1.38,1.22-2.48,2.26-2.96-2.07-4.36-3.78-4.36-5.14Z" fill="#ffc050"/>
      </svg>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [action, setAction] = useState('');
  const [praise, setPraise] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);

  const handlePraise = async (inputAction: string) => {
    if (!inputAction.trim()) return;
    
    setIsLoading(true);
    setPraise(null);
    
    const result = await getPraise(inputAction);
    
    setPraise(result);
    setIsLoading(false);
    
    // Clear input if it was from the text area
    if (inputAction === action) {
      setAction('');
    }
  };

  const handleShare = async () => {
    if (!bubbleRef.current) return;
    
    setIsSharing(true);
    try {
      const dataUrl = await toPng(bubbleRef.current, {
        cacheBust: true,
        backgroundColor: '#FFF9F9',
        style: {
          transform: 'scale(1)',
          borderRadius: '40px'
        }
      });
      
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'homemaru-praise.png', { type: 'image/png' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'ほめまるからのメッセージ',
          text: 'ほめまるに褒めてもらったよぉ！✨ #ほめほめツール'
        });
      } else {
        const link = document.createElement('a');
        link.download = 'homemaru-praise.png';
        link.href = dataUrl;
        link.click();
      }
    } catch (err) {
      console.error('Share failed:', err);
    } finally {
      setIsSharing(false);
    }
  };

  const quickActions = [
    { label: '起きた', icon: <Sun className="w-5 h-5 text-orange-400" /> },
    { label: 'ご飯食べた', icon: <Utensils className="w-5 h-5 text-yellow-500" /> },
    { label: 'お風呂入った', icon: <Bath className="w-5 h-5 text-blue-400" /> },
    { label: '歯磨きした', icon: <Sparkles className="w-5 h-5 text-cyan-400" /> },
    { label: '勉強・仕事した', icon: <BookOpen className="w-5 h-5 text-indigo-400" /> },
    { label: '掃除した', icon: <Trash2 className="w-5 h-5 text-green-400" /> },
    { label: '外に出た', icon: <MapPin className="w-5 h-5 text-red-400" /> },
    { label: 'えらい！', icon: <Heart className="w-5 h-5 text-pink-400" /> },
  ];

  return (
    <div className="min-h-screen bg-[#FFF9F9] font-sans text-gray-800 selection:bg-pink-200">
      {/* Header */}
      <header className="pt-10 pb-2 flex justify-center items-center max-w-2xl mx-auto w-full">
        <TitleSVG />
      </header>

      <main className="max-w-2xl mx-auto px-6 pb-24 flex flex-col items-center gap-4">
        
        {/* Character & Bubble Section */}
        <div className="relative w-full flex flex-col items-center min-h-[300px] justify-center">
          <AnimatePresence mode="wait">
            {(praise || isLoading) ? (
              <motion.div 
                key={isLoading ? 'loading' : 'praise'}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative w-full max-w-md aspect-square flex items-center justify-center"
              >
                {/* Layer 1: Bubble Background (Bottom) */}
                <div 
                  ref={bubbleRef}
                  className="absolute inset-0 bg-white rounded-[40px] shadow-[0_20px_50px_rgba(255,157,175,0.3)] border-2 border-pink-100 overflow-hidden"
                >
                  {/* Layer 2: Character (Middle) - Moved inside ref for capture */}
                  <div className="absolute inset-0 p-12 opacity-20 pointer-events-none">
                    <HomeruMaruSVG isPraising={true} />
                  </div>

                  {/* Layer 3: Text (Top) - Moved inside ref for capture */}
                  <div className="relative z-10 p-10 w-full h-full flex items-center justify-center overflow-y-auto">
                    <div className="prose prose-pink max-w-none w-full">
                      <div className="text-lg sm:text-xl font-bold leading-relaxed text-gray-700 text-center">
                        <ReactMarkdown>
                          {praise || ''}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Share Button Overlay (Outside ref to not be in image) */}
                {!isLoading && praise && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={handleShare}
                    disabled={isSharing}
                    className="absolute -bottom-4 right-4 z-20 flex items-center gap-2 px-4 py-2 bg-pink-400 text-white rounded-full shadow-lg hover:bg-pink-500 transition-all disabled:opacity-50"
                  >
                    {isSharing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                    <span className="text-xs font-bold">画像でシェア</span>
                  </motion.button>
                )}

                {/* Loading State Overlay */}
                {isLoading && (
                  <div className="relative z-30 flex flex-col items-center gap-3 text-pink-400">
                    <Loader2 className="w-10 h-10 animate-spin" />
                    <span className="font-bold text-lg">考え中だよぉ...✨</span>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-48 h-48"
              >
                <HomeruMaruSVG isPraising={false} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Actions */}
        <div className="w-full">
          <p className="text-center text-sm font-medium text-pink-400 mb-4 uppercase tracking-widest">
            なにしたのぉ？
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {quickActions.map((qa) => (
              <motion.button
                key={qa.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePraise(qa.label)}
                disabled={isLoading}
                className="flex flex-col items-center justify-center gap-2 p-4 bg-white rounded-2xl shadow-sm border border-pink-50 hover:border-pink-200 hover:shadow-md transition-all disabled:opacity-50"
              >
                {qa.icon}
                <span className="text-xs font-bold text-gray-600">{qa.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Custom Input */}
        <div className="w-full mt-4">
          <div className="relative group">
            <textarea
              value={action}
              onChange={(e) => setAction(e.target.value)}
              placeholder="他にもがんばったこと、教えてぇ！"
              className="w-full p-6 pr-16 bg-white rounded-3xl shadow-sm border-2 border-pink-50 focus:border-pink-300 focus:ring-0 transition-all resize-none h-32 text-gray-700 placeholder:text-pink-200"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  handlePraise(action);
                }
              }}
            />
            <button
              onClick={() => handlePraise(action)}
              disabled={!action.trim() || isLoading}
              className="absolute bottom-4 right-4 p-3 bg-pink-400 hover:bg-pink-500 disabled:bg-gray-200 text-white rounded-2xl shadow-lg transition-all disabled:shadow-none"
            >
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
            </button>
          </div>
          <p className="text-right text-[10px] text-pink-300 mt-2 font-medium">
            Ctrl + Enter で送信できるよぉ
          </p>
        </div>
      </main>

      {/* Footer Decoration */}
      <footer className="fixed bottom-0 left-0 w-full p-4 pointer-events-none overflow-hidden">
        <div className="flex justify-around opacity-10">
          <Heart className="w-12 h-12 text-pink-400 fill-pink-400 animate-pulse" />
          <Sparkles className="w-8 h-8 text-yellow-400 fill-yellow-400 animate-bounce" />
          <Heart className="w-10 h-10 text-pink-400 fill-pink-400 animate-pulse delay-75" />
        </div>
      </footer>
    </div>
  );
}
