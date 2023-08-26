import re
import string
import nltk
import spacy
import pandas as pd
import numpy as np
import math
from tqdm import tqdm

from spacy.matcher import Matcher
from spacy.tokens import Span
from spacy import displacy

pd.set_option('display.max_colwidth', 200)

# load spaCy model
# nlp = spacy.load("en_core_web_sm")
nlp = spacy.load("zh_core_web_sm")

# sample text
text = "前端开发则是网站的代码实现。"
text = "棕色的狐狸能够以超音速快速飞跃趴在地上的黄色的特种狗。"
text = "前端技术一般分为前端设计和前端开发，前端设计一般可以理解为网站的视觉设计，前端开发则是网站的前台代码实现。"
# text = "It doesn't seem to be a Python package or a valid path to a data directory."

# create a spaCy object
doc = nlp(text)


def getEntities(sent):
    ent1 = ""
    ent2 = ""
    prv_tok_dep = ""
    prv_tok_text = ""
    modifiers = ""
    for tok in sent:
        if tok.pos_ == "PUNCT":
            continue
        if tok.pos_ == "PART":
            modifiers = ""
        if tok.pos_ == "VERB":
            modifiers = ""

        if tok.dep_.endswith("mod"):
            modifiers += tok.text
        if tok.dep_.startswith("compound"):
            modifiers += tok.text
        if tok.dep_.find("conj") != -1:
            modifiers += tok.text
        if tok.dep_ == "cc":
            modifiers += tok.text

        if tok.dep_.find("subj") != -1:
            ent1 = modifiers + tok.text
            modifiers = ""
        if tok.dep_.find("obj") != -1 or tok.dep_ == "ROOT" and tok.pos_ == "NOUN":
            ent2 = modifiers + tok.text
            modifiers = ""

        prv_tok_dep = tok.dep_
        prv_tok_text = tok.text
    return [ent1.strip(), ent2.strip()]


def getRelation(sent):
    root = None
    res = ""
    for tok in sent:
        # find root of the sentence
        if tok.dep_ == "ROOT":
            root = tok
    for tok in sent:
        if tok == root and tok.pos_ != "NOUN":
            res += tok.text
            continue
        if tok.head != root:
            continue
        if tok.pos_ == "VERB":
            res += tok.text
            continue
        if tok.pos_ == "ADV" or tok.dep_.startswith("aux") or tok.dep_.endswith("mod"):
            res += tok.text
            continue
    return res.strip()


# print token, dependency, POS tag
for tok in doc:
    print("%12s %12s %12s %12s" % (tok.text, tok.dep_, tok.pos_, tok.head))
    # print(tok.text, "-->", tok.dep_, "-->", tok.pos_)

print("=========================================")
print(getEntities(doc)[0], getEntities(doc)[1])
print(getRelation(doc))
