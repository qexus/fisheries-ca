#!/usr/bin/env python3
"""Compile the checked-in FR/UK question banks without network access."""
import json
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
data = {lang: json.loads((ROOT / "translations" / f"quizzes-{lang}.json").read_text()) for lang in ("fr", "uk")}
(ROOT / "public/quiz-i18n.js").write_text(
    "/* 60 translated questions per language, aligned with the original answer indices. */\n"
    + "window.QX_LOCALIZED_QUIZZES="
    + json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    + ";\n", encoding="utf-8")
