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
nlp = spacy.load("zh_core_web_sm")

# sample text
text = "兄弟们怎么说? 确实挺不错的!"

# create a spaCy object
doc = nlp(text)

# print token, dependency, POS tag
for tok in doc:
    print("%12s %8s %8s" % (tok.text, tok.dep_, tok.pos_))
    # print(tok.text, "-->", tok.dep_, "-->", tok.pos_)
