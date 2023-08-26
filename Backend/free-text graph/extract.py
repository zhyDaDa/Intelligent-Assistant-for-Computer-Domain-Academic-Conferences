import re
import pandas as pd
import requests
import spacy
from spacy import displacy

nlp = spacy.load('zh_core_web_sm')

from spacy.matcher import Matcher
from spacy.tokens import Span

import matplotlib.pyplot as plt
from tqdm import tqdm

pd.set_option('display.max_colwidth', 200)


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
        if tok.pos_ == "PUNCT":
            continue
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


# go through all the sentences and extract entity relations
with open("d:/desktop/plain_text.txt", "r", encoding="utf8") as f:
    dataset = f.readlines()
    for line in tqdm(dataset):
        doc = nlp(line)
        print("Entities:", getEntities(doc))
        print("Relation:", getRelation(doc))
        print()
